<!-- claude: floating chat with the "Guia" AI assistant (Cloudflare Worker → OpenAI proxy) -->
<script lang="ts">
	import { PUBLIC_AI_WORKER_URL } from '$env/static/public';
	import { tick } from 'svelte';
	import type { AIGuideDayContext } from '$lib/types';

	let { dayContext = null }: { dayContext?: AIGuideDayContext | null } = $props();

	const workerUrl = PUBLIC_AI_WORKER_URL;

	interface ChatMessage {
		role: 'user' | 'assistant';
		content: string;
	}

	let open = $state(false);
	let messages = $state<ChatMessage[]>([]);
	let input = $state('');
	let loading = $state(false);
	let error = $state('');
	let scrollEl: HTMLDivElement | undefined = $state();

	function toggle() {
		open = !open;
	}

	function close() {
		open = false;
	}

	async function scrollToBottom() {
		await tick();
		scrollEl?.scrollTo({ top: scrollEl.scrollHeight });
	}

	async function send() {
		const text = input.trim();
		if (!text || loading || !workerUrl) return;

		const history = messages.map((m) => ({ role: m.role, content: m.content }));
		messages.push({ role: 'user', content: text });
		input = '';
		error = '';
		loading = true;
		scrollToBottom();

		try {
			const res = await fetch(`${workerUrl}/chat`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ message: text, dayContext, history })
			});
			const data = await res.json().catch(() => null);

			if (!res.ok) {
				error = data?.error ?? 'Não foi possível falar com o Guia agora.';
			} else if (data?.reply) {
				messages.push({ role: 'assistant', content: data.reply });
			} else {
				error = 'Resposta vazia do Guia.';
			}
		} catch {
			error = 'Sem conexão com o Guia. Verifique sua internet.';
		} finally {
			loading = false;
			scrollToBottom();
		}
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			send();
		}
	}
</script>

<button type="button" class="guide-btn" onclick={toggle} aria-label="Abrir Guia da Viagem">
	<span class="icon">💬</span>
	<span class="label">Guia</span>
</button>

{#if open}
	<button type="button" class="backdrop" aria-label="Fechar" onclick={close}></button>
	<div class="panel" role="dialog" aria-label="Guia da Viagem">
		<div class="panel-header">
			<h2>💬 Guia da Viagem</h2>
			<button type="button" class="close" aria-label="Fechar" onclick={close}>✕</button>
		</div>

		{#if !workerUrl}
			<p class="empty">Guia não configurado ainda.</p>
		{:else}
			<div class="messages" bind:this={scrollEl}>
				{#if messages.length === 0}
					<p class="empty">
						{dayContext
							? `Oi! Sou o Guia da viagem. Hoje é o dia ${dayContext.dayNumber}, em ${dayContext.city}. Como posso ajudar?`
							: 'Oi! Sou o Guia da viagem. Ainda não há um dia ativo do roteiro, mas pode perguntar o que quiser.'}
					</p>
				{/if}
				{#each messages as m, i (i)}
					<div class="bubble {m.role}">{m.content}</div>
				{/each}
				{#if loading}
					<div class="bubble assistant dots" aria-label="Guia está digitando">
						<span></span><span></span><span></span>
					</div>
				{/if}
				{#if error}
					<p class="error">{error}</p>
				{/if}
			</div>

			<form
				class="input-row"
				onsubmit={(e) => {
					e.preventDefault();
					send();
				}}
			>
				<input
					type="text"
					placeholder="Pergunte ao Guia…"
					bind:value={input}
					onkeydown={onKeydown}
					disabled={loading}
				/>
				<button type="submit" disabled={loading || !input.trim()} aria-label="Enviar">➤</button>
			</form>
		{/if}
	</div>
{/if}

<style>
	.guide-btn {
		position: fixed;
		right: 1rem;
		bottom: calc(var(--nav-height) + var(--safe-bottom) + 0.7rem);
		z-index: 549;
		display: flex;
		align-items: center;
		gap: 0.4rem;
		height: 2.75rem;
		padding: 0 1rem;
		border-radius: 999px;
		background: linear-gradient(155deg, var(--color-accent), var(--color-accent-strong));
		color: #fff;
		border: 2px solid rgba(255, 255, 255, 0.12);
		box-shadow: var(--shadow-lg);
		font-weight: 700;
		font-size: 0.85rem;
	}
	.guide-btn .icon {
		font-size: 1.15rem;
		line-height: 1;
	}
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 9996;
		background: rgba(0, 0, 0, 0.55);
		border: none;
		padding: 0;
		cursor: default;
	}
	.panel {
		position: fixed;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 9997;
		height: 80dvh;
		display: flex;
		flex-direction: column;
		background: var(--color-bg-alt);
		color: var(--color-text);
		font-family: var(--font-sans);
		border-radius: var(--radius-lg) var(--radius-lg) 0 0;
		padding: 1.1rem 1.1rem calc(0.75rem + var(--safe-bottom));
		box-shadow: var(--shadow-lg);
		border: 1px solid var(--color-border);
		border-bottom: none;
	}
	.panel-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}
	.panel-header h2 {
		font-size: 1.15rem;
		margin: 0;
		font-weight: 800;
	}
	.close {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 50%;
		width: 2rem;
		height: 2rem;
		color: var(--color-text-muted);
		font-size: 1rem;
		padding: 0;
		cursor: pointer;
		flex-shrink: 0;
	}
	.messages {
		flex: 1;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0.4rem 0.1rem;
	}
	.empty {
		color: var(--color-text-muted);
		font-size: 0.85rem;
		line-height: 1.4;
		margin: 0.5rem 0;
	}
	.error {
		color: var(--color-danger-text);
		font-size: 0.8rem;
		margin: 0.2rem 0 0;
	}
	.bubble {
		max-width: 82%;
		padding: 0.55rem 0.75rem;
		border-radius: var(--radius-md);
		font-size: 0.88rem;
		line-height: 1.42;
		white-space: pre-wrap;
	}
	.bubble.user {
		align-self: flex-end;
		background: var(--color-accent);
		color: #fff;
		border-bottom-right-radius: 0.25rem;
	}
	.bubble.assistant {
		align-self: flex-start;
		background: var(--color-surface-2);
		color: var(--color-text);
		border-bottom-left-radius: 0.25rem;
	}
	.dots {
		display: flex;
		gap: 0.28rem;
		align-items: center;
		padding: 0.75rem 0.9rem;
	}
	.dots span {
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 50%;
		background: var(--color-text-subtle);
		animation: bounce 1.1s infinite ease-in-out;
	}
	.dots span:nth-child(2) {
		animation-delay: 0.15s;
	}
	.dots span:nth-child(3) {
		animation-delay: 0.3s;
	}
	@keyframes bounce {
		0%,
		80%,
		100% {
			transform: translateY(0);
			opacity: 0.5;
		}
		40% {
			transform: translateY(-0.25rem);
			opacity: 1;
		}
	}
	.input-row {
		display: flex;
		gap: 0.5rem;
		margin-top: 0.6rem;
		flex-shrink: 0;
	}
	.input-row input {
		flex: 1;
		min-width: 0;
		border: 1px solid var(--color-border);
		border-radius: 999px;
		padding: 0.6rem 0.9rem;
		font-size: 0.9rem;
		font-family: inherit;
		background: var(--color-surface);
		color: var(--color-text);
	}
	.input-row input:focus {
		outline: 2px solid var(--color-accent-soft);
	}
	.input-row button {
		width: 2.5rem;
		height: 2.5rem;
		flex-shrink: 0;
		border-radius: 50%;
		border: none;
		background: var(--color-accent);
		color: #fff;
		font-size: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.input-row button:disabled {
		opacity: 0.5;
		cursor: default;
	}
</style>
