# travelos-claude

TravelOS — versão desenvolvida pelo Claude (Anthropic), em paralelo à
versão original feita com ChatGPT.

Objetivo: PWA offline-first para uso pessoal do Rafael e Leonardo na
viagem Ásia 2026 (5–29 nov). Stack: SvelteKit + adapter-static +
vite-plugin-pwa.

## Documentação

A documentação-mestre desta versão está no Google Drive:
https://drive.google.com/drive/folders/1cSMDxh-FGdUEhQTl2fcAYharr-ExepRM

- Visão do produto, arquitetura, UX, modelo de dados, offline/mapas,
  registro de decisões (C-001..) e plano de execução — 8 capítulos em
  Markdown.

A versão original (ChatGPT), para comparação, está em:
https://drive.google.com/drive/folders/1ON6KHoxZt2Mr8pSWQ_jZ_YXR8qBiVDjt
(SÓ LEITURA — não alterar)

## Status

- Docs: v0.1.0 aprovada
- Código: pendente — próximo passo é Sprint 0 (scaffold + CI)

## Regras

1. Nada de passaporte, cartões, vouchers ou credenciais neste repo.
2. Toda decisão nova entra em docs/06-registro-decisoes.md como C-nnn.
3. Bundle-alvo JS gzip inicial: ≤ 60 KB (bloqueia PR se ultrapassar).
4. Autoria: Claude (Anthropic), a pedido de Rafael Versutti Noetzold.
