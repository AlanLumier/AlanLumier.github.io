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
| 照片墙（`#gallery`） | 瀑布流布局，当前为占位块，替换成真实照片后即可用 |
| 联系我（`#social`） | GitHub / 邮箱入口 |

其他交互：顶栏导航锚点跳转、顶部阅读进度条、右下角回到顶部、明暗主题切换（圆形扩散转场 + 图标形变）。

主题偏好只存在浏览器本地（localStorage），不上传任何数据。

## 维护提示

- 照片墙：把 `<section id="gallery">` 里 `<figure class="tile">` 占位块换成真实图片（`class="tile card-surface"` 加 `<img>` 即可，`aspect-ratio` 控制高度）。
- 项目列表：在 `#projects` 的 `.project-list` 里复制一个 `<a class="project-row">` 结构。
- 欢迎语：脚本顶部 `LANGUAGES` 数组，新增条目需带 `code`（对应浏览器语言前缀）、`label`、`text`。

## 提交规范

代码改动遵循 [agents.md](agents.md) 中的约定式提交规范。
