# claude: Deploy script - TravelOS AI Guide Cloudflare Worker
# Execute: duplo clique em EXECUTAR-DEPLOY.bat

Write-Host ""
Write-Host "=== TravelOS AI Guide - Deploy do Cloudflare Worker ===" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar Node
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "ERRO: Node.js nao encontrado. Instale em https://nodejs.org" -ForegroundColor Red
    pause; exit 1
}

# 2. Instalar wrangler
Write-Host "Passo 1/4: Instalando Wrangler CLI..." -ForegroundColor Yellow
npm install -g wrangler 2>&1 | Out-Null
Write-Host "Wrangler instalado." -ForegroundColor Green

# 3. Login no Cloudflare
Write-Host ""
Write-Host "Passo 2/4: Abrindo navegador para login no Cloudflare..." -ForegroundColor Yellow
Write-Host "           Clique em Allow para autorizar." -ForegroundColor Gray
Set-Location $PSScriptRoot
wrangler login

# 4. Secret da OpenAI
Write-Host ""
Write-Host "Passo 3/4: Digite sua chave da OpenAI quando aparecer Enter value:" -ForegroundColor Yellow
wrangler secret put OPENAI_API_KEY --name travelos-claude-guide

# 5. Deploy
Write-Host ""
Write-Host "Passo 4/4: Fazendo deploy..." -ForegroundColor Yellow
wrangler deploy index.js --name travelos-claude-guide --compatibility-date 2024-01-01

Write-Host ""
Write-Host "Deploy concluido!" -ForegroundColor Green
Write-Host "URL: https://travelos-claude-guide.rafaelsemfiltro-1.workers.dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "Avise o Claude que o deploy foi feito." -ForegroundColor Gray
Write-Host ""
pause
