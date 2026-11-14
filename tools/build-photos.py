"""
把桌面 photo 文件夹里的照片处理成网页用图，生成「三列纵向循环」的照片墙，并注入 index.html。

两套尺寸：
  缩略图  assets/photos/pNN.webp        长边 720px，墙上展示够清晰又轻
  大图    assets/photos/large/pNN.webp  长边 1200px，点开放大时才加载

两套图都经 Pillow 重编码，EXIF（含定位）不会带出去。

用法：python tools/build-photos.py [源目录]
默认源目录：C:\\Users\\19577\\Desktop\\photo
"""

import json
import os
import sys

from PIL import Image, ImageOps

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
INDEX_PATH = os.path.join(ROOT, "index.html")
OUT_DIR = os.path.join(ROOT, "assets", "photos")
LARGE_DIR = os.path.join(OUT_DIR, "large")
DEFAULT_SOURCE = r"C:\Users\19577\Desktop\photo"

THUMB_SIDE = 720
THUMB_QUALITY = 78
LARGE_SIDE = 1200
LARGE_QUALITY = 80
COLUMNS = 3
START = "<!-- PHOTOS_START -->"
END = "<!-- PHOTOS_END -->"


def save(image, path, max_side, quality):
    width, height = image.size
    scale = min(1.0, max_side / max(width, height))
    if scale < 1.0:
        image = image.resize(
            (max(1, round(width * scale)), max(1, round(height * scale))), Image.LANCZOS
        )
    image.save(path, "WEBP", quality=quality, method=6)
    return image.size


def prepare(source_dir):
    os.makedirs(OUT_DIR, exist_ok=True)
    os.makedirs(LARGE_DIR, exist_ok=True)
    names = sorted(
        name
        for name in os.listdir(source_dir)
        if name.lower().endswith((".jpg", ".jpeg", ".png", ".webp", ".bmp"))
    )
    if not names:
        raise SystemExit(f"{source_dir} 里没有图片")

    photos = []
    for index, name in enumerate(names, start=1):
        with Image.open(os.path.join(source_dir, name)) as raw:
            image = ImageOps.exif_transpose(raw)
            if image.mode not in ("RGB", "L"):
                image = image.convert("RGB")

            file_name = f"p{index:02d}.webp"
            save(image, os.path.join(OUT_DIR, file_name), THUMB_SIDE, THUMB_QUALITY)
            save(image, os.path.join(LARGE_DIR, file_name), LARGE_SIDE, LARGE_QUALITY)

            width, height = image.size
            photos.append({"file": file_name, "aspect": round(width / height, 4)})
            print(f"{name} -> {file_name} ({width}x{height})")
    return photos


def figure(photo, index):
    """一张照片卡片：data-photo 是大图索引，供放大查看按原顺序翻页"""
    return (
        f'            <figure class="photo" style="aspect-ratio: {photo["aspect"]};" '
        f'data-photo="{index}">\n'
        f'              <img src="./assets/photos/{photo["file"]}" '
        f'data-large="./assets/photos/large/{photo["file"]}" '
        f'alt="照片 {index}" loading="lazy" decoding="async" />\n'
        f"            </figure>"
    )


def build_group(photos):
    return "\n".join(figure(photo, index) for index, photo in photos)


def build_wall(photos):
    """三列错开：按顺序轮流分到每一列，每列放两份实现无缝循环"""
    columns = [[] for _ in range(COLUMNS)]
    for offset, photo in enumerate(photos, start=1):
        columns[(offset - 1) % COLUMNS].append((photo, offset))

    blocks = []
    for column in columns:
        group = "\n".join(figure(photo, index) for photo, index in column)
        blocks.append(
            '      <div class="wall-col">\n'
            '        <div class="wall-track">\n'
            '          <div class="wall-group">\n'
            f"{group}\n"
            "          </div>\n"
            '          <div class="wall-group" aria-hidden="true">\n'
            f"{group}\n"
            "          </div>\n"
            "        </div>\n"
            "      </div>"
        )
    return "\n".join(blocks)


def inject(block):
    with open(INDEX_PATH, encoding="utf-8") as handle:
        source = handle.read()
    if START not in source or END not in source:
        raise SystemExit("index.html 里缺少 PHOTOS_START / PHOTOS_END 标记")

    head = source.index(START)
    tail = source.index(END) + len(END)
    patched = source[:head] + f"{START}\n{block}\n      {END}" + source[tail:]
    with open(INDEX_PATH, "w", encoding="utf-8") as handle:
        handle.write(patched)
    return len(block)


def main():
    source_dir = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_SOURCE
    if not os.path.isdir(source_dir):
        raise SystemExit(f"找不到源目录：{source_dir}")

    photos = prepare(source_dir)
    size = inject(build_wall(photos))

    manifest = os.path.join(OUT_DIR, "manifest.json")
    with open(manifest, "w", encoding="utf-8") as handle:
        json.dump(photos, handle, ensure_ascii=False, indent=2)

    print(f"\n共 {len(photos)} 张，分 {COLUMNS} 列")
    print(f"注入 index.html：{size} 字符")


if __name__ == "__main__":
    main()
