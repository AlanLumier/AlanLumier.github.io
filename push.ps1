# 推送到远程 GitHub Pages 仓库
# 用法：pwsh -File push.ps1  （或在此目录下运行 .\push.ps1）
# 说明：动态读取 gh CLI 的 token，避免把明文 token 写进配置或文件。
$ErrorActionPreference = "Stop"

$token = gh auth token
if (-not $token) {
    Write-Error "gh 未登录或无法获取 token，请先执行 gh auth login"
    exit 1
}

git push "https://AlanLumier:$token@github.com/AlanLumier/AlanLumier.github.io.git" main

# 同步远程追踪分支，避免 git status 显示虚假的 ahead/behind
git fetch origin main
