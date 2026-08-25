# TravelOS AI Guide — Worker

Proxy em Cloudflare Workers para o assistente "Guia" do TravelOS. Fica **fora** do build/deploy
do app (não é tocado pelo CI) — é publicado separadamente, uma única vez, pelo usuário.

Isso existe para não expor a chave da OpenAI no frontend estático (GitHub Pages): o app chama
este worker, e é o worker quem chama a OpenAI usando a chave guardada como secret.

## Deploy

1. `npm install -g wrangler`
2. `wrangler login`
3. `wrangler secret put OPENAI_API_KEY` (cola a chave quando pedir — dentro da pasta `worker/`)
4. `wrangler deploy`
5. Copiar a URL gerada (ex: `travelos-claude-guide.rafael-versutti.workers.dev`)
6. Criar `.env` na raiz do projeto com: `PUBLIC_AI_WORKER_URL=https://...`
7. `npm run build && git add -A && git commit -m "feat: add AI worker url # claude" && git push origin main`

Os passos 3–4 devem ser executados de dentro da pasta `worker/` (onde está o `wrangler.toml`).

## Atualizando depois

Qualquer alteração em `worker/index.js` só entra em produção rodando `wrangler deploy` de novo
manualmente — não é automático.
