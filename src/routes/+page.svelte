<!-- claude: Hoje — today's trip day, wake-feeling check-in, adaptive A/B/C display -->
<script lang="ts">
	import ContingencyToggle from '$lib/components/ContingencyToggle.svelte';
	import DayContent from '$lib/components/DayContent.svelte';
	import DeadlineCard from '$lib/components/DeadlineCard.svelte';
	import { loadDayState, saveDayState } from '$lib/db/dayState';
	import {
		dayStatusLabel,
		findDayByDate,
		nextAction,
		protectedDeadline,
		suggestContingency,
		todayISO,
		tripProgress,
		WAKE_EMOJI
	} from '$lib/logic';
	import type { ContingencyLevel, TripDay, WakeFeeling } from '$lib/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let phase = $state<'loading' | 'before' | 'active' | 'after'>('loading');
	let todayDay = $state<TripDay | undefined>(undefined);
	let daysUntilStart = $state(0);
	let wakeFeeling = $state<WakeFeeling | undefined>(undefined);
	let active = $state<ContingencyLevel | undefined>(undefined);
	let progress = $derived(tripProgress(data.days, todayISO()));
	let planLevel = $derived(active ?? todayDay?.contingencies[0]?.level ?? 'A');
	let next = $derived(todayDay ? nextAction(todayDay, planLevel) : undefined);
	let deadline = $derived(todayDay ? protectedDeadline(todayDay, planLevel) : undefined);

	const WAKE_LABEL: Record<WakeFeeling, string> = { rough: 'Cansado', ok: 'Ok', rested: 'Disposto' };

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
	{#if phase === 'loading'}
		<p class="hint">Carregando…</p>
	{:else if phase === 'before'}
		<div class="centered">
			<p class="eyebrow">{data.trip.name} · embarque em {daysUntilStart} dias</p>
			<span class="hero-emoji">🌏</span>
			<h1>TravelOS</h1>
			<p class="countdown">{daysUntilStart}</p>
			<p class="hint">dias para a viagem</p>
			{#if data.days[0]}
				<p class="departure">📍 {data.days[0].location}, {data.days[0].country} · {data.days[0].date}</p>
			{/if}
		</div>
	{:else if phase === 'after'}
		<div class="centered">
			<span class="hero-emoji">🏁</span>
			<h1>Viagem concluída</h1>
			<p class="hint">Bem-vindo de volta 👋</p>
		</div>
	{:else if todayDay}
		<div class="hero">
			<div class="progress-track">
				<div class="progress-fill" style="width: {progress.percent}%"></div>
			</div>
			<p class="eyebrow">{data.trip.name} · dia {progress.current} · {dayStatusLabel(todayDay)}</p>
			<p class="date">
				Dia {progress.current} de {progress.total} · {todayDay.date}
			</p>
			<h1>{todayDay.title}</h1>
			<p class="location">📍 {todayDay.location} · {todayDay.country}</p>
		</div>

		{#if next}
			<div class="next-action" class:past={next.isPast}>
				<span class="na-label">{next.isPast ? 'Última ação do dia' : 'Próxima ação'}</span>
				<div class="na-row">
					<time class="na-time">{next.time}</time>
					<span class="na-title">{next.title}</span>
				</div>
				{#if next.subtitle}<span class="na-subtitle">📍 {next.subtitle}</span>{/if}
			</div>
		{/if}

		{#if deadline}
			<DeadlineCard entry={deadline} />
		{/if}

		<section class="wake">
			<p class="label">Como você acordou?</p>
			<div class="wake-buttons">
				{#each [['rough', WAKE_EMOJI.rough], ['ok', WAKE_EMOJI.ok], ['rested', WAKE_EMOJI.rested]] as [feeling, emoji]}
					<button
						type="button"
						class:active={wakeFeeling === feeling}
						onclick={() => selectWake(feeling as WakeFeeling)}
					>
						<span class="emoji">{emoji}</span>
						<span class="wake-label">{WAKE_LABEL[feeling as WakeFeeling]}</span>
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
		color: var(--color-text);
		padding: 1rem 1rem calc(var(--nav-height) + var(--safe-bottom) + 1.5rem);
	}
	.centered {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 85dvh;
		gap: 0.35rem;
		text-align: center;
	}
	.hero-emoji {
		font-size: 2.75rem;
		margin-bottom: 0.25rem;
	}
	.countdown {
		font-size: 3.5rem;
		font-weight: 800;
		margin: 0.5rem 0 0;
		background: linear-gradient(155deg, var(--color-accent-text), var(--color-accent));
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		line-height: 1;
	}
	.hint {
		color: var(--color-text-muted);
		margin: 0;
	}
	.eyebrow {
		font-size: 0.72rem;
		color: var(--color-text-subtle);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		margin: 0 0 0.2rem;
	}
	.departure {
		margin: 0.5rem 0 0;
		color: var(--color-text-muted);
		font-size: 0.85rem;
	}
	.hero {
		background: linear-gradient(155deg, var(--color-surface-2), var(--color-surface));
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: 1.1rem 1.15rem 1.25rem;
		margin: 0.5rem 0 1.25rem;
		box-shadow: var(--shadow-md);
	}
	.progress-track {
		height: 0.35rem;
		background: rgba(15, 23, 42, 0.08);
		border-radius: 999px;
		overflow: hidden;
		margin-bottom: 0.75rem;
	}
	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, var(--color-accent), var(--color-accent-strong));
		border-radius: 999px;
		transition: width 0.3s ease;
	}
	.date {
		margin: 0;
		font-size: 0.72rem;
		color: var(--color-accent-text);
		font-weight: 700;
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
		margin: 0;
		color: var(--color-text-muted);
		font-size: 0.88rem;
	}
	.next-action {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		background: linear-gradient(155deg, var(--color-accent-soft), var(--color-surface));
		border: 1px solid var(--color-accent);
		border-radius: var(--radius-lg);
		padding: 0.9rem 1rem;
		margin: 0 0 1.1rem;
		box-shadow: var(--shadow-sm);
	}
	.next-action.past {
		border-color: var(--color-border-strong);
		background: var(--color-surface);
	}
	.na-label {
		font-size: 0.68rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-accent-text);
	}
	.next-action.past .na-label {
		color: var(--color-text-subtle);
	}
	.na-row {
		display: flex;
		align-items: baseline;
		gap: 0.6rem;
	}
	.na-time {
		font-size: 1.4rem;
		font-weight: 800;
		letter-spacing: -0.01em;
	}
	.na-title {
		font-size: 0.95rem;
		font-weight: 600;
	}
	.na-subtitle {
		font-size: 0.8rem;
		color: var(--color-text-muted);
	}
	.wake {
		margin: 0 0 1.25rem;
	}
	.wake .label {
		font-size: 0.85rem;
		color: var(--color-text-muted);
		margin: 0 0 0.6rem;
		font-weight: 600;
	}
	.wake-buttons {
		display: flex;
		gap: 0.5rem;
	}
	.wake-buttons button {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.3rem;
		padding: 0.85rem 0.5rem;
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		transition:
			border-color 0.15s ease,
			background 0.15s ease;
	}
	.wake-buttons .emoji {
		font-size: 1.6rem;
		line-height: 1;
	}
	.wake-buttons .wake-label {
		font-size: 0.7rem;
		color: var(--color-text-muted);
		font-weight: 600;
	}
	.wake-buttons button.active {
		border-color: var(--color-accent);
		background: var(--color-accent-soft);
	}
	.wake-buttons button.active .wake-label {
		color: var(--color-accent-text);
	}
</style>
