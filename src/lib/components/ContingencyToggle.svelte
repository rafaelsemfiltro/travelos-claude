<!-- claude: A/B/C/D contingency selector -->
<script lang="ts">
	import type { Contingency, ContingencyLevel } from '$lib/types';

	let {
		contingencies,
		active,
		onSelect
	}: {
		contingencies: Contingency[];
		active: ContingencyLevel;
		onSelect: (level: ContingencyLevel) => void;
	} = $props();
</script>

<div class="toggle" role="group" aria-label="Plano de contingência">
	{#each contingencies as c (c.level)}
		<button
			type="button"
			class:active={c.level === active}
			onclick={() => onSelect(c.level)}
			title={c.description}
		>
			{c.level}
		</button>
	{/each}
</div>

{#each contingencies as c (c.level)}
	{#if c.level === active}
		<p class="description">{c.description}</p>
	{/if}
{/each}

<style>
	.toggle {
		display: flex;
		gap: 0.5rem;
		background: var(--color-surface);
		padding: 0.3rem;
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
	}
	button {
		flex: 1;
		padding: 0.55rem;
		border-radius: var(--radius-sm);
		border: none;
		background: transparent;
		color: var(--color-text-muted);
		font-size: 1rem;
		font-weight: 700;
		transition:
			background 0.15s ease,
			color 0.15s ease;
	}
	button.active {
		background: linear-gradient(155deg, var(--color-accent), var(--color-accent-strong));
		color: #fff;
		box-shadow: var(--shadow-sm);
	}
	.description {
		margin: 0.6rem 0 0;
		color: var(--color-text-muted);
		font-size: 0.85rem;
		line-height: 1.4;
	}
</style>
