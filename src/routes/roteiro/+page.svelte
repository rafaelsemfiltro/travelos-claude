<!-- claude: full 25-day roteiro list -->
<script lang="ts">
	import { ENERGY_BADGE } from '$lib/logic';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Roteiro — TravelOS</title>
</svelte:head>

<main>
	<a class="back" href="/">← Hoje</a>
	<h1>Roteiro — Ásia 2026</h1>
	<ul class="days">
		{#each data.days as day (day.id)}
			<li>
				<a href="/dia/{day.id}">
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
	h1 {
		font-size: 1.25rem;
		margin: 0.75rem 0 1rem;
	}
	.days {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.days a {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.6rem 0.75rem;
		background: #1e293b;
		border-radius: 0.5rem;
		text-decoration: none;
		color: inherit;
	}
	.num {
		font-size: 0.75rem;
		color: #93c5fd;
		font-weight: 700;
		flex-shrink: 0;
	}
	.info {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-width: 0;
	}
	.title {
		font-size: 0.9rem;
	}
	.meta {
		font-size: 0.75rem;
		color: #94a3b8;
	}
	.badge {
		font-size: 1rem;
	}
</style>
