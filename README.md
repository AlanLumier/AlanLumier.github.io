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
| 项目 / 作品（`#projects`） | 项目列表，每项带简介与技术栈标签 |
| 照片墙（`#gallery`） | 29 张实拍照片的横向跑马灯，无缝循环；鼠标移入暂停滚动，单张跟随光标做 3D 悬浮 |
| 联系我（`#social`） | GitHub / 邮箱入口 |

其他交互：顶栏导航锚点跳转、顶部阅读进度条、右下角回到顶部、明暗主题切换（圆形扩散转场 + 图标形变）。

主题偏好只存在浏览器本地（localStorage），不上传任何数据。

## 视觉规范

整站由一条品牌渐变派生，新增任何元素都优先从这几个变量取色，不要引入新的色系：

| 变量 | 明色 | 暗色 | 用途 |
| --- | --- | --- | --- |
| `--grad-warm` / `--grad-cool` | `#ffeae1` → `#b6faff` | `#221c1e` → `#0c181c` | 页面背景渐变的两端 |
| `--line-gradient` | 加深版 `#ffc4ac` → `#8ce6f4` | 半透明粉色 → 青色 | 所有描边：卡片、顶栏、标签、进度条 |
| `--brand-gradient` | `#ffb79e` → `#7fdcf0` | 同左 | 头像、当前语言圆点等实心块 |
| `--accent` | `#0f7a86` | `#7ee3ef` | 图标、链接等需要保证可读性的强调色 |

描边统一用「渐变边框」实现：卡片类是 `background: linear-gradient(变量) padding-box, var(--line-gradient) border-box`；标签、徽章这类小控件用 `::before` 加 `mask` 挖出 1px 环。

## 维护提示

- 照片墙：把照片丢进 `C:\Users\19577\Desktop\photo`，然后运行 `python tools/build-photos.py`（可传目录参数）。脚本会统一转成 WebP（长边 900px、去掉 EXIF）、生成无缝跑马灯的两组卡片，并重写 `index.html` 里 `<!-- PHOTOS_START -->` 到 `<!-- PHOTOS_END -->` 之间的内容。
- 项目列表：在 `#projects` 的 `.project-list` 里复制一个 `<a class="project-row">` 结构。
- 欢迎语：脚本顶部 `LANGUAGES` 数组，新增条目需带 `code`（对应浏览器语言前缀）、`label`、`text`。
- 主题切换：转场期间会给 `<html>` 加 `.vt-active`，它会暂停欢迎语动画并挂起轮播倒计时（`theme:suspend` / `theme:resume` 事件），新增动效时记得一起处理，否则转场结束后会「追帧」卡顿。

## 提交规范

代码改动遵循 [agents.md](agents.md) 中的约定式提交规范。
