# Registro de Decisões — TravelOS Claude

## Features Futuras Anotadas

### [PENDENTE] Guia AI — Modo Reorganização de Roteiro
**Data:** 2026-08-25  
**Prioridade:** Alta  

**Descrição:** O Guia AI atualmente só sugere reorganizações em texto na conversa. O roteiro exibido nos cards do dia não é alterado.

Implementar um "modo reorganização" onde o Guia pode propor um roteiro alternativo para o dia (ordem diferente de atividades, troca de plano A→B→C, etc.) que o usuário pode **aceitar ou rejeitar** antes de aplicar. O roteiro original nunca é sobrescrito sem confirmação explícita.

**Motivação:** O roteiro não pode ficar engessado durante a viagem. Imprevistos (cansaço, clima, atrasos, descobertas no caminho) são parte da experiência e o app precisa se adaptar em tempo real.

**Comportamento esperado:**
- Guia sugere reorganização → exibe diff do roteiro (antes/depois) → usuário aprova → cards do dia atualizam
- Botão "Reverter para original" sempre disponível
- Histórico de reorganizações do dia

---

## Decisões Tomadas (C-DEFINIDAS)

| ID | Decisão | Data |
|----|---------|------|
| C-001 | adapter-static + GitHub Pages (sem SSR) | 2026-08 |
| C-002 | Cloudflare Workers como proxy OpenAI (sem expor API key no frontend) | 2026-08 |
| C-003 | Day IDs são strings "dia-01" a "dia-25" (não números) | 2026-08 |
| C-004 | Bundle JS ≤ 60 KB gzip é lei — refatorar antes de mergear | 2026-08 |
| C-005 | Nenhuma credencial (passaporte, cartão, voucher) no repo | 2026-08 |
