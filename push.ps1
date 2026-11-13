# 推送到远程 GitHub Pages 仓库（SSH）
# 用法：pwsh -File push.ps1  （或在此目录下运行 .\push.ps1）
# 说明：origin 已指向 git@github.com:AlanLumier/AlanLumier.github.io.git。
#       SSH 走 22 端口，比 HTTPS(443) 在部分网络环境下稳定；HTTPS 会被连接重置。
$ErrorActionPreference = "Stop"

git push origin main

# 同步远程追踪分支，避免 git status 显示虚假的 ahead/behind
git fetch origin main
