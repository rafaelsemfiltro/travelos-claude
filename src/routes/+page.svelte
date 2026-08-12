<!-- claude: Hoje — today's trip day, wake-feeling check-in, adaptive A/B/C display -->
<script lang="ts">
	import ContingencyToggle from '$lib/components/ContingencyToggle.svelte';
	import DayContent from '$lib/components/DayContent.svelte';
	import { loadDayState, saveDayState } from '$lib/db/dayState';
	import { findDayByDate, suggestContingency, todayISO, WAKE_EMOJI } from '$lib/logic';
	import type { ContingencyLevel, TripDay, WakeFeeling } from '$lib/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let phase = $state<'loading' | 'before' | 'active' | 'after'>('loading');
	let todayDay = $state<TripDay | undefined>(undefined);
	let daysUntilStart = $state(0);
	let wakeFeeling = $state<WakeFeeling | undefined>(undefined);
	let active = $state<ContingencyLevel | undefined>(undefined);

	$effect(() => {
		const iso = todayISO();
		const day = findDayByDate(data.days, iso);
		const start = data.days[0]?.date;
		const end = data.days[data.days.length - 1]?.date;

		if (day) {
			todayDay = day;
			phase = 'active';
			loadDayState(day.id).then((state) => {
				wakeFeeling = state.wakeFeeling;
				active =
					state.activeContingency ??
					(state.wakeFeeling ? suggestContingency(state.wakeFeeling, day) : day.contingencies[0]?.level);
			});
		} else if (start && iso < start) {
			phase = 'before';
			daysUntilStart = Math.ceil((+new Date(start) - +new Date(iso)) / 86_400_000);
		} else {
			phase = 'after';
		}
	});

	async function selectWake(feeling: WakeFeeling) {
		if (!todayDay) return;
		wakeFeeling = feeling;
		const suggested = suggestContingency(feeling, todayDay);
		active = suggested;
		const state = await loadDayState(todayDay.id);
		await saveDayState({ ...state, wakeFeeling: feeling, activeContingency: suggested });
	}

	async function selectContingency(level: ContingencyLevel) {
		if (!todayDay) return;
		active = level;
		const state = await loadDayState(todayDay.id);
		await saveDayState({ ...state, activeContingency: level });
	}
</script>

<svelte:head>
	<title>Hoje — TravelOS</title>
</svelte:head>

<main>
	<nav>
		<a href="/roteiro">Roteiro completo →</a>
	</nav>

	{#if phase === 'loading'}
		<p class="hint">Carregando…</p>
	{:else if phase === 'before'}
		<div class="centered">
			<h1>TravelOS</h1>
			<p class="hint">Faltam {daysUntilStart} dias para a viagem — Ásia 2026</p>
		</div>
	{:else if phase === 'after'}
		<div class="centered">
			<h1>Viagem concluída</h1>
			<p class="hint">Bem-vindo de volta 👋</p>
		</div>
	{:else if todayDay}
		<p class="date">D{String(todayDay.dayNumber).padStart(2, '0')} · {todayDay.date}</p>
		<h1>{todayDay.title}</h1>
		<p class="location">{todayDay.location} · {todayDay.country}</p>

		<section class="wake">
			<p class="label">Como você acordou?</p>
			<div class="wake-buttons">
				{#each [['rough', WAKE_EMOJI.rough], ['ok', WAKE_EMOJI.ok], ['rested', WAKE_EMOJI.rested]] as [feeling, emoji]}
					<button
						type="button"
						class:active={wakeFeeling === feeling}
						onclick={() => selectWake(feeling as WakeFeeling)}
					>
						{emoji}
					</button>
				{/each}
			</div>
		</section>

		{#if wakeFeeling && active}
			<ContingencyToggle contingencies={todayDay.contingencies} {active} onSelect={selectContingency} />
			<DayContent day={todayDay} {active} />
		{/if}
	{/if}
</main>

<style>
	main {
		min-height: 100dvh;
		background: #0f172a;
		color: #f8fafc;
		font-family: system-ui, sans-serif;
		padding: 1rem 1rem 5rem;
	}
	nav {
		text-align: right;
	}
	nav a {
		color: #93c5fd;
		text-decoration: none;
		font-size: 0.85rem;
	}
	.centered {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 70dvh;
		gap: 0.5rem;
		text-align: center;
	}
	.hint {
		color: #94a3b8;
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
	.wake {
		margin: 1rem 0 1.25rem;
	}
	.wake .label {
		font-size: 0.85rem;
		color: #cbd5e1;
		margin: 0 0 0.5rem;
	}
	.wake-buttons {
		display: flex;
		gap: 0.5rem;
	}
	.wake-buttons button {
		flex: 1;
		padding: 0.75rem;
		font-size: 1.5rem;
		border-radius: 0.5rem;
		border: 1px solid #334155;
		background: #1e293b;
	}
	.wake-buttons button.active {
		border-color: #2563eb;
		background: #1e3a8a;
	}
</style>
