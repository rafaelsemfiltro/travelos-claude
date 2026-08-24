<!-- claude: day detail — timeline + A/B/C/D toggle -->
<script lang="ts">
	import ContingencyToggle from '$lib/components/ContingencyToggle.svelte';
	import DayContent from '$lib/components/DayContent.svelte';
	import { loadDayState, saveDayState } from '$lib/db/dayState';
	import { ENERGY_BADGE } from '$lib/logic';
	import type { ContingencyLevel } from '$lib/types';
	import type { PageData } from './$types';
	import { untrack } from 'svelte';
	import { base } from '$app/paths';

	let { data }: { data: PageData } = $props();
	let day = $derived(data.day);

	let active = $state<ContingencyLevel>(untrack(() => data.day.contingencies[0]?.level ?? 'A'));

	$effect(() => {
		let cancelled = false;
		loadDayState(day.id).then((state) => {
			if (!cancelled && state.activeContingency) active = state.activeContingency;
		});
		return () => {
			cancelled = true;
		};
	});

	async function select(level: ContingencyLevel) {
		active = level;
		const state = await loadDayState(day.id);
		await saveDayState({ ...state, activeContingency: level });
	}
</script>

<svelte:head>
	<title>{day.title} — TravelOS</title>
</svelte:head>

<main>
	<a class="back" href="{base}/roteiro">← Roteiro</a>
	<p class="date">
		D{String(day.dayNumber).padStart(2, '0')} · {day.date}
		<span class="energy" title="energia: {day.energyRequired}">{ENERGY_BADGE[day.energyRequired]}</span>
	</p>
	<h1>{day.title}</h1>
	<p class="location">📍 {day.location} · {day.country}</p>

	{#if day.notes}
		<p class="day-notes">📝 {day.notes}</p>
	{/if}

	<ContingencyToggle contingencies={day.contingencies} {active} onSelect={select} />

	<DayContent {day} {active} />

	<nav class="day-nav">
		{#if data.previous}
			<a class="nav-link prev" href="{base}/dia/{data.previous.id}">← Dia anterior</a>
		{:else}
			<span></span>
		{/if}
		{#if data.next}
			<a class="nav-link next" href="{base}/dia/{data.next.id}">Próximo dia →</a>
		{/if}
	</nav>
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
	.date {
		margin: 0.75rem 0 0;
		font-size: 0.75rem;
		color: var(--color-accent-text);
		font-weight: 700;
		display: flex;
		align-items: center;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
	h1 {
		font-size: 1.5rem;
		font-weight: 800;
		margin: 0.3rem 0;
		letter-spacing: -0.01em;
	}
	.location {
		margin: 0 0 1rem;
		color: var(--color-text-muted);
		font-size: 0.85rem;
	}
	.energy {
		margin-left: 0.4rem;
	}
	.day-notes {
		background: var(--color-warning-soft);
		border: 1px solid rgba(245, 158, 11, 0.35);
		border-radius: var(--radius-md);
		padding: 0.65rem 0.85rem;
		margin: 0 0 1rem;
		font-size: 0.85rem;
		color: var(--color-warning-text);
		line-height: 1.4;
	}
	.day-nav {
		display: flex;
		justify-content: space-between;
		gap: 0.75rem;
		margin-top: 1.75rem;
	}
	.nav-link {
		flex: 1;
		text-align: center;
		color: var(--color-accent-text);
		text-decoration: none;
		font-size: 0.85rem;
		font-weight: 600;
		padding: 0.65rem;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}
	.day-nav .prev {
		text-align: left;
	}
	.day-nav .next {
		text-align: right;
	}
</style>
