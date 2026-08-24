<!-- claude: "hora-limite protegida" — the day's rigid must-not-miss transport moment -->
<script lang="ts">
	import { DEADLINE_CONSEQUENCE } from '$lib/logic';
	import type { TimelineEntry } from '$lib/logic';

	let { entry }: { entry: TimelineEntry } = $props();
</script>

<div class="deadline-card">
	<span class="deadline-label">⏱️ Hora-limite protegida</span>
	<span class="deadline-time">{entry.time}</span>
	<span class="deadline-title">{entry.title}</span>
	{#if entry.transport}
		<span class="deadline-consequence">{DEADLINE_CONSEQUENCE[entry.transport.type]}</span>
	{/if}
</div>

<style>
	.deadline-card {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		background: linear-gradient(155deg, var(--color-danger-soft), var(--color-surface));
		border: 1px solid var(--color-danger);
		border-radius: var(--radius-lg);
		padding: 0.9rem 1rem;
		margin: 0 0 1.1rem;
		box-shadow: var(--shadow-sm);
	}
	.deadline-label {
		font-size: 0.68rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-danger-text);
	}
	.deadline-time {
		font-size: 2rem;
		font-weight: 800;
		line-height: 1.1;
		color: var(--color-danger-text);
		letter-spacing: -0.02em;
	}
	.deadline-title {
		font-size: 0.9rem;
		font-weight: 600;
	}
	.deadline-consequence {
		font-size: 0.78rem;
		color: var(--color-text-muted);
		line-height: 1.4;
	}
</style>
