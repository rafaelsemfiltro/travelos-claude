<!-- claude: Creator Hub — ideias de conteúdo por dia baseadas no roteiro real -->
<script lang="ts">
	import { creatorData } from '$lib/data/creator';
	import { allDays } from '$lib/data/days';
	import { todayISO } from '$lib/logic';

	const TIPO_EMOJI: Record<string, string> = {
		foto: '📸',
		story: '📱',
		reel: '🎬',
		nota: '✏️'
	};

	const TIPO_LABEL: Record<string, string> = {
		foto: 'Foto',
		story: 'Story',
		reel: 'Reel',
		nota: 'Nota'
	};

	// Find today's diaId by matching date
	const today = todayISO();
	const todayDay = allDays.find((d) => d.date === today);
	const todayId = todayDay?.id ?? null;

	// Open state per diaId — today auto-expanded
	let openIds = $state<Set<string>>(new Set(todayId ? [todayId] : []));

	function toggle(diaId: string) {
		const next = new Set(openIds);
		if (next.has(diaId)) {
			next.delete(diaId);
		} else {
			next.add(diaId);
		}
		openIds = next;
	}

	// Merge creatorData with day numbers from allDays
	const enriched = creatorData.map((cd) => {
		const day = allDays.find((d) => d.id === cd.diaId);
		return { ...cd, dayNumber: day?.dayNumber ?? 0, date: day?.date ?? '' };
	});
</script>

<svelte:head>
	<title>Creator Hub — TravelOS</title>
</svelte:head>

<main>
	<header class="page-header">
		<div class="header-icon">🎬</div>
		<div>
			<h1>Creator Hub</h1>
			<p class="subtitle">Ideias de conteúdo por dia</p>
		</div>
	</header>

	<div class="days-list">
		{#each enriched as cd (cd.diaId)}
			{@const isOpen = openIds.has(cd.diaId)}
			{@const isToday = cd.diaId === todayId}
			<div class="day-card" class:open={isOpen} class:today={isToday}>
				<button class="day-header" onclick={() => toggle(cd.diaId)} aria-expanded={isOpen}>
					<div class="day-meta">
						{#if isToday}<span class="today-badge">Hoje</span>{/if}
						<span class="day-num">D{String(cd.dayNumber).padStart(2, '0')}</span>
						<span class="day-dest">{cd.destino}</span>
					</div>
					<span class="idea-count">{cd.ideias.length} ideias</span>
					<span class="chevron" aria-hidden="true">{isOpen ? '▲' : '▼'}</span>
				</button>

				{#if isOpen}
					<div class="ideias">
						{#each cd.ideias as ideia}
							<div class="ideia-card">
								<div class="ideia-top">
									<span class="tipo-badge tipo-{ideia.tipo}">
										{TIPO_EMOJI[ideia.tipo]}
										{TIPO_LABEL[ideia.tipo]}
									</span>
									{#if ideia.melhorHorario}
										<span class="horario-chip">🕐 {ideia.melhorHorario}</span>
									{/if}
								</div>
								<p class="ideia-titulo">{ideia.titulo}</p>
								<p class="ideia-desc">{ideia.descricao}</p>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</main>

<style>
	main {
		padding: 1rem 1rem calc(var(--nav-height) + var(--safe-bottom) + 1.5rem);
		max-width: 600px;
		margin: 0 auto;
	}

	.page-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
		padding-top: 0.5rem;
	}

	.header-icon {
		font-size: 2rem;
		line-height: 1;
	}

	h1 {
		margin: 0;
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color-accent);
		line-height: 1.2;
	}

	.subtitle {
		margin: 0.15rem 0 0;
		font-size: 0.82rem;
		color: var(--color-text-muted);
	}

	.days-list {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.day-card {
		background: var(--color-surface);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		box-shadow: var(--shadow-sm);
		overflow: hidden;
		transition: box-shadow 0.15s ease;
	}

	.day-card.today {
		border-color: var(--color-accent);
		box-shadow: 0 0 0 1px var(--color-accent), var(--shadow-sm);
	}

	.day-card.open {
		box-shadow: var(--shadow-md);
	}

	.day-header {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.85rem 1rem;
		background: none;
		border: none;
		text-align: left;
		cursor: pointer;
		color: var(--color-text);
	}

	.day-header:hover {
		background: var(--color-surface-2);
	}

	.day-meta {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
		min-width: 0;
	}

	.today-badge {
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		background: var(--color-accent);
		color: #fff;
		padding: 0.15rem 0.4rem;
		border-radius: 99px;
	}

	.day-num {
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--color-text-subtle);
		font-variant-numeric: tabular-nums;
	}

	.day-dest {
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--color-text);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 200px;
	}

	.idea-count {
		font-size: 0.72rem;
		color: var(--color-text-subtle);
		white-space: nowrap;
	}

	.chevron {
		font-size: 0.6rem;
		color: var(--color-text-subtle);
	}

	.ideias {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 0 0.75rem 0.75rem;
	}

	.ideia-card {
		background: var(--color-bg);
		border-radius: var(--radius-sm);
		padding: 0.75rem 0.85rem;
		border: 1px solid var(--color-border);
	}

	.ideia-top {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-bottom: 0.35rem;
	}

	.tipo-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.7rem;
		font-weight: 700;
		padding: 0.15rem 0.45rem;
		border-radius: 99px;
		text-transform: uppercase;
		letter-spacing: 0.03em;
	}

	.tipo-foto {
		background: rgba(28, 61, 90, 0.1);
		color: var(--color-accent-text);
	}

	.tipo-story {
		background: rgba(217, 119, 6, 0.1);
		color: var(--color-warning-text);
	}

	.tipo-reel {
		background: rgba(220, 38, 38, 0.1);
		color: var(--color-danger-text);
	}

	.tipo-nota {
		background: rgba(22, 163, 74, 0.12);
		color: var(--color-success-text);
	}

	.horario-chip {
		font-size: 0.68rem;
		color: var(--color-text-muted);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		padding: 0.1rem 0.4rem;
		border-radius: 99px;
	}

	.ideia-titulo {
		margin: 0 0 0.25rem;
		font-size: 0.88rem;
		font-weight: 700;
		color: var(--color-text);
		line-height: 1.3;
	}

	.ideia-desc {
		margin: 0;
		font-size: 0.8rem;
		color: var(--color-text-muted);
		line-height: 1.5;
	}
</style>
