<!-- claude: full 25-day roteiro list -->
<script lang="ts">
	import { ENERGY_BADGE, todayISO, tripProgress } from '$lib/logic';
	import type { PageData } from './$types';
	import { base } from '$app/paths';

	let { data }: { data: PageData } = $props();
	let progress = $derived(tripProgress(data.days, todayISO()));
</script>

<svelte:head>
	<title>Roteiro — TravelOS</title>
</svelte:head>

<main>
	<a class="back" href="{base}/">← Hoje</a>
	<h1>Roteiro</h1>
	<p class="trip-name">{data.trip.name}</p>
	{#if data.trip.travelers?.length}
		<p class="travelers">👥 {data.trip.travelers.join(' · ')}</p>
	{/if}

	<div class="progress">
		<div class="progress-track">
			<div class="progress-fill" style="width: {Math.max(progress.percent, progress.current ? 4 : 0)}%"></div>
		</div>
		<span class="progress-label">
			{#if progress.current}Dia {progress.current} de {progress.total}{:else}{progress.total} dias planejados{/if}
		</span>
	</div>

	<ul class="days">
		{#each data.days as day (day.id)}
			<li class:today={day.date === todayISO()}>
				<a href="{base}/dia/{day.id}">
					<span class="num">D{String(day.dayNumber).padStart(2, '0')}</span>
					<span class="info">
						<span class="title">{day.title}</span>
						<span class="meta">{day.date} · {day.location}</span>
					</span>
					<span class="badge" title="energia: {day.energyRequired}">{ENERGY_BADGE[day.energyRequired]}</span>
				</a>
			</li>
		{/each}
	</ul>
</main>

<style>
	main {
		min-height: 100dvh;
		color: var(--color-text);
		padding: 1rem 1rem calc(var(--nav-height) + var(--safe-bottom) + 1.5rem);
	}
	.back {
		color: var(--color-accent-text);
		text-decoration: none;
		font-size: 0.85rem;
		font-weight: 600;
	}
	h1 {
		font-size: 1.6rem;
		font-weight: 800;
		margin: 0.75rem 0 0;
		letter-spacing: -0.01em;
	}
	.trip-name {
		margin: 0.15rem 0 0.5rem;
		color: var(--color-accent-text);
		font-size: 0.9rem;
		font-weight: 600;
	}
	.travelers {
		margin: 0 0 1rem;
		color: var(--color-text-muted);
		font-size: 0.85rem;
	}
	.progress {
		margin: 0 0 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
	.progress-track {
		height: 0.4rem;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 999px;
		overflow: hidden;
	}
	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, var(--color-accent), var(--color-accent-strong));
		border-radius: 999px;
		transition: width 0.3s ease;
	}
	.progress-label {
		font-size: 0.75rem;
		color: var(--color-text-muted);
		font-weight: 600;
	}
	.days {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.55rem;
	}
	.days a {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		padding: 0.75rem 0.9rem;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		text-decoration: none;
		color: inherit;
		box-shadow: var(--shadow-sm);
		transition: border-color 0.15s ease;
	}
	.days li.today a {
		border-color: var(--color-accent);
		background: linear-gradient(155deg, var(--color-surface-2), var(--color-surface));
	}
	.num {
		font-size: 0.7rem;
		color: var(--color-accent-text);
		font-weight: 800;
		flex-shrink: 0;
		background: var(--color-accent-soft);
		padding: 0.3rem 0.5rem;
		border-radius: var(--radius-sm);
	}
	.info {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-width: 0;
		gap: 0.1rem;
	}
	.title {
		font-size: 0.92rem;
		font-weight: 600;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.meta {
		font-size: 0.75rem;
		color: var(--color-text-muted);
	}
	.badge {
		font-size: 1.05rem;
		flex-shrink: 0;
	}
</style>
