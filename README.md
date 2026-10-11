# 🌙 失眠夜 · 个人空间

> 在代码里构建逻辑，在方块里搭建世界，在赛场里验证热爱。

一个基于纯前端 HTML/CSS/JavaScript 构建的个人主页，融合了编程开发、机器人工程、游戏竞技等多元兴趣展示，配有丰富的交互动画和深夜主题彩蛋。

## 页面

| 页面 | 说明 |
| --- | --- |
| `index.html` | 首页：欢迎页、个人标签页、作品墙、生活数据 |
| `space.html` | 个人空间：作品、荣誉、联系方式 |
| `works.html` | 全部作品 |
| `works/` | 各作品的独立展示页 |
| `changelog.html` | 完整更新日志（v1 至今） |
| `status.html` | 运行状态 |
| `easter.html` | 今日彩蛋 |
| `404.html` | 迷路页 |

## 技术

纯静态站点，无构建步骤、无运行时依赖：原生 HTML/CSS/JavaScript，
通过 GitHub Pages 直接从 `main` 分支根目录发布 → https://alanlumier.github.io/

## 开发文件

补丁脚本与中间产物统一放在 `_dev/`（已被 `.gitignore` 排除，不参与发布）。
