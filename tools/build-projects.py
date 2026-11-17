"""
从 GitHub 拉取公开仓库，生成首页「项目 / 作品」列表（构建期执行，运行时不请求网络）。

超过 4 条时，第 5 条起默认隐藏，页面上用「展开全部」按钮堆叠展开。

用法：python tools/build-projects.py
"""

import json
import os
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
INDEX = os.path.join(ROOT, "index.html")
API = "https://api.github.com/users/AlanLumier/repos?sort=pushed&per_page=100"
START = "<!-- PROJECTS_START -->"
END = "<!-- PROJECTS_END -->"
VISIBLE = 4
MAX_ITEMS = 8

ARROW = (
    '<svg class="project-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
    'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
    '<path d="M7 17 17 7" /><path d="M8 7h9v9" /></svg>'
)


def fetch_repos():
    request = urllib.request.Request(
        API,
        headers={
            "User-Agent": "AlanLumier-site-builder",
            "Accept": "application/vnd.github+json",
        },
    )
    with urllib.request.urlopen(request, timeout=20) as response:
        return json.loads(response.read().decode("utf-8"))


def pick(repos):
    items = [
        repo
        for repo in repos
        if not repo.get("fork") and not repo.get("archived") and repo.get("name")
    ]
    items.sort(key=lambda repo: repo.get("pushed_at") or "", reverse=True)
    return items[:MAX_ITEMS]


def row(repo, hidden):
    name = repo["name"]
    desc = (repo.get("description") or "暂无简介").strip()
    language = repo.get("language")
    # 语言已经用徽章展示，标签里只放 topics，避免重复
    tags = []
    for topic in repo.get("topics") or []:
        if language and topic.lower() == language.lower():
            continue
        if topic.lower() not in {tag.lower() for tag in tags}:
            tags.append(topic)
    tags = tags[:3]

    classes = "project-row card-surface" + (" is-extra" if hidden else "")
    tech = (
        f'<span class="project-tech">{"".join(f"<span>{tag}</span>" for tag in tags)}</span>'
        if tags
        else ""
    )
    badge = f'<span class="project-badge">{language}</span>' if language else ""

    return f"""      <a class="{classes}" href="https://github.com/AlanLumier/{name}" target="_blank" rel="noopener">
        <span class="project-main">
          <span class="project-name">{name}{badge}</span>
          <span class="project-desc">{desc}</span>
          {tech}
        </span>
        {ARROW}
      </a>"""


def main():
    repos = pick(fetch_repos())
    if not repos:
        raise SystemExit("没有取到仓库")

    rows = [row(repo, index >= VISIBLE) for index, repo in enumerate(repos)]
    block = "\n".join(rows)

    with open(INDEX, encoding="utf-8") as handle:
        source = handle.read().replace("\r\n", "\n")
    if START not in source or END not in source:
        raise SystemExit("index.html 里缺少 PROJECTS_START / PROJECTS_END 标记")

    head = source.index(START)
    tail = source.index(END) + len(END)
    source = source[:head] + f"{START}\n{block}\n      {END}" + source[tail:]

    with open(INDEX, "w", encoding="utf-8") as handle:
        handle.write(source)

    extra = max(0, len(repos) - VISIBLE)
    for repo in repos:
        print(f'{repo["name"]} · {repo.get("language") or "-"} · {repo.get("pushed_at", "")[:10]}')
    print(f"\n共写入 {len(repos)} 条，其中 {extra} 条默认折叠")


if __name__ == "__main__":
    main()
