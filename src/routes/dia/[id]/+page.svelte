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
	<p class="location">{day.location} · {day.country}</p>

	{#if day.notes}
		<p class="day-notes">📝 {day.notes}</p>
	{/if}

	<ContingencyToggle contingencies={day.contingencies} {active} onSelect={select} />

	<DayContent {day} {active} />

	<nav class="day-nav">
		{#if data.previous}
			<a href="{base}/dia/{data.previous.id}">← Dia anterior</a>
		{:else}
			<span></span>
		{/if}
		{#if data.next}
			<a href="{base}/dia/{data.next.id}">Próximo dia →</a>
		{/if}
	</nav>
</main>

<style>
	main {
		min-height: 100dvh;
		background: #0f172a;
		color: #f8fafc;
		font-family: system-ui, sans-serif;
		padding: 1rem 1rem 5rem;
	}
	.back {
		color: #93c5fd;
		text-decoration: none;
		font-size: 0.85rem;
	}
	.date {
		margin: 0.75rem 0 0;
		font-size: 0.75rem;
		color: #93c5fd;
		font-weight: 700;
	}
	h1 {
		font-size: 1.25rem;
		margin: 0.25rem 0;
	}
	.location {
		margin: 0 0 1rem;
		color: #94a3b8;
		font-size: 0.85rem;
	}
	.energy {
		margin-left: 0.4rem;
	}
	.day-notes {
		background: #1e293b;
		border-radius: 0.5rem;
		padding: 0.6rem 0.75rem;
		margin: 0 0 1rem;
		font-size: 0.85rem;
		color: #fde68a;
	}
	.day-nav {
		display: flex;
		justify-content: space-between;
		margin-top: 1.5rem;
	}
	.day-nav a {
		color: #93c5fd;
		text-decoration: none;
		font-size: 0.85rem;
	}
</style>
