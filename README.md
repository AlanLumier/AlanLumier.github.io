# AlanLumier

个人空间网站（GitHub Pages）。

- 站点地址：https://alanlumier.github.io
- 仓库地址：https://github.com/AlanLumier/AlanLumier.github.io

## 说明

纯静态个人站点，本地直接打开即可运行，无需后端服务。

页面分为五块：

| 区块 | 内容 |
| --- | --- |
| 欢迎（`#welcome`） | 14 种语言的欢迎语循环播放，逐字从虚空中浮现再逐字消散；可点击大字或圆点手动切换，首屏语种跟随浏览器语言 |
| 关于我（`#about`） | 头像、简介、标签，配一张实时本地时间卡片和站点说明 |
| 每日一言（`#daily`） | 读取在线一言接口（hitokoto），按天缓存在 localStorage；「换一句」可手动换，网络不通时回退到本地句子 |
| 项目 / 作品（`#projects`） | 自动同步自 GitHub 公开仓库，每项带语言徽章与 topics；超过 4 条自动折叠 |
| 照片墙（`#gallery`） | 29 张实拍照片分三行横向无缝滚动（行与行速度、方向、起点都错开，两端渐隐）；鼠标停在某一行只暂停该行；单张跟随光标做 3D 悬浮；点击任意照片打开放大查看 |
| 联系我（`#social`） | GitHub / 邮箱入口 |

其他交互：顶栏导航锚点跳转、顶部阅读进度条、右下角回到顶部、明暗主题切换（圆形扩散转场 + 图标形变）。

主题偏好只存在浏览器本地（localStorage），不上传任何数据。

## 视觉规范

整站由一条品牌渐变派生，新增任何元素都优先从这几个变量取色，不要引入新的色系：

| 变量 | 明色 | 暗色 | 用途 |
| --- | --- | --- | --- |
| `--grad-warm` / `--grad-cool` | `#ffeae1` → `#b6faff` | `#221c1e` → `#0c181c` | 页面背景渐变的两端 |
| `--line-gradient` | 加深版 `#ffc4ac` → `#8ce6f4` | 半透明粉色 → 青色 | 所有描边：卡片、顶栏、标签、进度条 |
| `--card-fill` | `#d0fdf8` → `#ffc5ce` | `#243c3e` → `#402a30` | 所有卡片（`.card-surface`）的底色 |
| `--brand-gradient` | `#ffb79e` → `#7fdcf0` | 同左 | 头像、当前语言圆点等实心块 |
| `--accent` | `#0f7a86` | `#7ee3ef` | 图标、链接等需要保证可读性的强调色 |

描边统一用「渐变边框」实现：卡片类是 `background: var(--card-fill) padding-box, var(--line-gradient) border-box`；标签、徽章这类小控件用 `::before` 加 `mask` 挖出 1px 环。

## 维护提示

- 项目列表：运行 `python tools/build-projects.py`，脚本会读取 GitHub 公开仓库（按最近推送排序、过滤 fork），重写 `<!-- PROJECTS_START -->` 到 `<!-- PROJECTS_END -->` 区间；超过 4 条的部分默认折叠，页面出现「展开全部」按钮。
- 头像 / 站点图标 / 分享图：`python tools/build-assets.py <头像图片路径>`，会生成 `assets/avatar.webp`、`assets/apple-touch-icon.png`、`assets/og.png`、`assets/favicon.svg`。
- 404 页：根目录 `404.html`，GitHub Pages 会自动接管错误的路径；页面含纸飞机插画、渐变 404、回首页/看照片两个入口与站内快捷链接。
- 照片墙：把照片丢进 `C:\Users\19577\Desktop\photo`，然后运行 `python tools/build-photos.py`（可传目录参数）。脚本会输出两套图——缩略图 `assets/photos/pNN.webp`（长边 720px，墙上用）与大图 `assets/photos/large/pNN.webp`（长边 1200px，放大查看用），都经过重编码以去掉 EXIF，然后按行轮流分配照片、每行复制一份实现无缝横向滚动，并重写 `index.html` 里 `<!-- PHOTOS_START -->` 到 `<!-- PHOTOS_END -->` 之间的内容。
- 放大查看：`<dialog class="lightbox">` 实现，点击照片打开，支持左右方向键翻页、Esc 或点空白关闭。画框尺寸固定（不随照片长宽比跳动），两层 `<img>` 交叉淡入换图，并预取相邻大图。
- 项目列表：在 `#projects` 的 `.project-list` 里复制一个 `<a class="project-row">` 结构。
- 欢迎语：脚本顶部 `LANGUAGES` 数组，新增条目需带 `code`（对应浏览器语言前缀）、`label`、`text`。
- 主题切换：转场期间会给 `<html>` 加 `.vt-active`，它会暂停欢迎语动画并挂起轮播倒计时（`theme:suspend` / `theme:resume` 事件），新增动效时记得一起处理，否则转场结束后会「追帧」卡顿。

## 提交规范

代码改动遵循 [agents.md](agents.md) 中的约定式提交规范。
