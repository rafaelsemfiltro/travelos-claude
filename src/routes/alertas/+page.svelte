<!-- claude: página de alertas e pendências críticas — TravelOS Ásia 2026 -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { alertas, type Alerta } from '$lib/data/alertas';

	// --- icons ---
	const tipoIcon: Record<Alerta['tipo'], string> = {
		voo: '✈️',
		visto: '🛂',
		hotel: '🏨',
		transporte: '🚌',
		saude: '🏥',
		geral: '📋'
	};

	// --- filter state ---
	type Filtro = 'todos' | 'criticos' | 'concluidos';
	let filtro: Filtro = $state('todos');

	// --- concluido persistence ---
	let concluidosSet: Set<string> = $state(new Set());

	onMount(() => {
		try {
			const raw = localStorage.getItem('travelos-alertas-concluidos');
			if (raw) concluidosSet = new Set(JSON.parse(raw) as string[]);
		} catch {
			// silently ignore
		}
	});

	function toggleConcluido(id: string) {
		const next = new Set(concluidosSet);
		if (next.has(id)) {
			next.delete(id);
		} else {
			next.add(id);
		}
		concluidosSet = next;
		try {
			localStorage.setItem('travelos-alertas-concluidos', JSON.stringify([...next]));
		} catch {
			// silently ignore
		}
	}

	// --- derived state ---
	let enriched = $derived(alertas.map((a) => ({ ...a, concluido: concluidosSet.has(a.id) })));

	let criticosPendentes = $derived(
		enriched.filter((a) => a.urgencia === 'critica' && !a.concluido).length
	);

	let visible = $derived(
		filtro === 'todos'
			? enriched.filter((a) => !a.concluido)
			: filtro === 'criticos'
				? enriched.filter((a) => a.urgencia === 'critica' && !a.concluido)
				: enriched.filter((a) => a.concluido)
	);

	let sorted = $derived(
		[...visible].sort((a, b) => {
			const ord: Record<Alerta['urgencia'], number> = { critica: 0, alta: 1, normal: 2 };
			return ord[a.urgencia] - ord[b.urgencia];
		})
	);
</script>

<svelte:head>
	<title>Alertas — TravelOS</title>
</svelte:head>

<div class="page">
	<!-- header -->
	<header class="page-header">
		<div class="header-row">
			<h1>Alertas</h1>
			{#if criticosPendentes > 0}
				<span class="badge-critico">{criticosPendentes} crítico{criticosPendentes > 1 ? 's' : ''}</span>
			{/if}
		</div>
		<p class="subtitle">Pendências e prazos da viagem</p>
	</header>

	<!-- filter tabs -->
	<div class="filter-tabs" role="tablist">
		<button
			role="tab"
			aria-selected={filtro === 'todos'}
			class:active={filtro === 'todos'}
			onclick={() => (filtro = 'todos')}
		>
			Todos
		</button>
		<button
			role="tab"
			aria-selected={filtro === 'criticos'}
			class:active={filtro === 'criticos'}
			onclick={() => (filtro = 'criticos')}
		>
			🔴 Críticos
		</button>
		<button
			role="tab"
			aria-selected={filtro === 'concluidos'}
			class:active={filtro === 'concluidos'}
			onclick={() => (filtro = 'concluidos')}
		>
			✅ Concluídos
		</button>
	</div>

	<!-- alert list -->
	<main class="alerts-list">
		{#if sorted.length === 0}
			<div class="empty-state">
				{#if filtro === 'concluidos'}
					<span class="empty-icon">📭</span>
					<p>Nenhum alerta concluído ainda.</p>
					<p class="empty-hint">Marque os itens como feitos conforme for preparando a viagem.</p>
				{:else}
					<span class="empty-icon">🎉</span>
					<p>Tudo em ordem!</p>
					<p class="empty-hint">Nenhum alerta pendente nesta categoria.</p>
				{/if}
			</div>
		{:else}
			{#each sorted as alerta (alerta.id)}
				<article class="alerta-card urgencia-{alerta.urgencia}" class:done={alerta.concluido}>
					<div class="card-left">
						<span class="tipo-icon">{tipoIcon[alerta.tipo]}</span>
					</div>
					<div class="card-body">
						<div class="card-top">
							<span class="titulo" class:done-text={alerta.concluido}>{alerta.titulo}</span>
							<button
								class="check-btn"
								aria-label={alerta.concluido ? 'Marcar como pendente' : 'Marcar como concluído'}
								onclick={() => toggleConcluido(alerta.id)}
							>
								{alerta.concluido ? '✅' : '⬜'}
							</button>
						</div>
						{#if !alerta.concluido}
							<p class="descricao">{alerta.descricao}</p>
						{/if}
						<div class="card-footer">
							<span class="prazo-chip">🕐 {alerta.prazo}</span>
							{#if !alerta.concluido}
								<span class="urgencia-chip urgencia-chip-{alerta.urgencia}">
									{alerta.urgencia === 'critica' ? '🔴 Crítico' : alerta.urgencia === 'alta' ? '🟠 Alta' : '⚪ Normal'}
								</span>
							{/if}
						</div>
					</div>
				</article>
			{/each}
		{/if}
	</main>

	<div class="bottom-spacer"></div>
</div>

<style>
	.page {
		min-height: 100dvh;
		background: var(--color-bg);
		padding-bottom: calc(var(--nav-height) + var(--safe-bottom) + 1rem);
	}

	/* header */
	.page-header {
		padding: 1.25rem 1.25rem 0.75rem;
		background: var(--color-surface);
		border-bottom: 1px solid var(--color-border);
	}
	.header-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	h1 {
		margin: 0;
		font-size: 1.6rem;
		font-weight: 700;
		color: var(--color-accent);
		letter-spacing: -0.02em;
	}
	.badge-critico {
		background: var(--color-danger);
		color: #fff;
		font-size: 0.7rem;
		font-weight: 700;
		padding: 0.2rem 0.55rem;
		border-radius: 999px;
		letter-spacing: 0.02em;
	}
	.subtitle {
		margin: 0.2rem 0 0;
		font-size: 0.82rem;
		color: var(--color-text-subtle);
	}

	/* filter tabs */
	.filter-tabs {
		display: flex;
		gap: 0.5rem;
		padding: 0.75rem 1.25rem;
		background: var(--color-surface);
		border-bottom: 1px solid var(--color-border);
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
	}
	.filter-tabs::-webkit-scrollbar {
		display: none;
	}
	.filter-tabs button {
		flex-shrink: 0;
		border: 1.5px solid var(--color-border);
		background: transparent;
		color: var(--color-text-muted);
		font-size: 0.82rem;
		font-weight: 600;
		padding: 0.4rem 0.9rem;
		border-radius: 999px;
		cursor: pointer;
		transition:
			background 0.15s,
			color 0.15s,
			border-color 0.15s;
		white-space: nowrap;
	}
	.filter-tabs button.active {
		background: var(--color-accent);
		color: #fff;
		border-color: var(--color-accent);
	}

	/* alerts list */
	.alerts-list {
		padding: 1rem 1rem 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	/* card */
	.alerta-card {
		display: flex;
		gap: 0.75rem;
		background: var(--color-surface);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-sm);
		padding: 0.9rem 1rem;
		border-left: 4px solid transparent;
		transition: opacity 0.2s;
	}
	.alerta-card.urgencia-critica {
		border-left-color: var(--color-danger);
	}
	.alerta-card.urgencia-alta {
		border-left-color: var(--color-warning);
	}
	.alerta-card.urgencia-normal {
		border-left-color: var(--color-border-strong);
	}
	.alerta-card.done {
		opacity: 0.6;
	}

	.card-left {
		flex-shrink: 0;
		display: flex;
		align-items: flex-start;
		padding-top: 0.1rem;
	}
	.tipo-icon {
		font-size: 1.4rem;
		line-height: 1;
	}

	.card-body {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.card-top {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
		justify-content: space-between;
	}
	.titulo {
		font-size: 0.9rem;
		font-weight: 700;
		color: var(--color-text);
		line-height: 1.35;
		flex: 1;
	}
	.titulo.done-text {
		text-decoration: line-through;
		color: var(--color-text-subtle);
	}
	.check-btn {
		background: none;
		border: none;
		padding: 0;
		font-size: 1.15rem;
		cursor: pointer;
		line-height: 1;
		flex-shrink: 0;
		margin-top: -0.05rem;
	}

	.descricao {
		margin: 0;
		font-size: 0.8rem;
		color: var(--color-text-muted);
		line-height: 1.5;
	}

	.card-footer {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		align-items: center;
		margin-top: 0.1rem;
	}
	.prazo-chip {
		font-size: 0.72rem;
		color: var(--color-text-muted);
		background: var(--color-surface-2);
		padding: 0.2rem 0.5rem;
		border-radius: 999px;
		font-weight: 500;
		white-space: nowrap;
	}
	.urgencia-chip {
		font-size: 0.68rem;
		font-weight: 700;
		padding: 0.2rem 0.5rem;
		border-radius: 999px;
		white-space: nowrap;
	}
	.urgencia-chip-critica {
		background: var(--color-danger-soft);
		color: var(--color-danger-text);
	}
	.urgencia-chip-alta {
		background: var(--color-warning-soft);
		color: var(--color-warning-text);
	}
	.urgencia-chip-normal {
		background: var(--color-surface-2);
		color: var(--color-text-subtle);
	}

	/* empty state */
	.empty-state {
		text-align: center;
		padding: 3rem 1.5rem;
		color: var(--color-text-muted);
	}
	.empty-icon {
		display: block;
		font-size: 3rem;
		margin-bottom: 0.75rem;
	}
	.empty-state p {
		margin: 0 0 0.3rem;
		font-size: 0.95rem;
		font-weight: 600;
	}
	.empty-hint {
		font-size: 0.82rem !important;
		font-weight: 400 !important;
		color: var(--color-text-subtle) !important;
	}

	.bottom-spacer {
		height: 1rem;
	}
</style>
