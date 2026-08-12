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
	}
	button {
		flex: 1;
		padding: 0.6rem;
		border-radius: 0.5rem;
		border: 1px solid #334155;
		background: #1e293b;
		color: #f8fafc;
		font-size: 1rem;
		font-weight: 600;
	}
	button.active {
		background: #2563eb;
		border-color: #2563eb;
	}
	.description {
		margin: 0.5rem 0 0;
		color: #94a3b8;
		font-size: 0.85rem;
	}
</style>
