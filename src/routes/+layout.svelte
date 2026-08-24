<script lang="ts">
	import '$lib/styles/theme.css';
	import favicon from '$lib/assets/favicon.svg';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import EmergencyButton from '$lib/components/EmergencyButton.svelte';
	import { isOffline } from '$lib/stores/offline';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if $isOffline}
	<div class="offline-banner">✈️ Modo avião — conteúdo offline</div>
{/if}

{@render children()}

<EmergencyButton />
<BottomNav />

<style>
	.offline-banner {
		position: sticky;
		top: 0;
		z-index: 600;
		background: var(--color-warning-soft);
		color: var(--color-warning-text);
		text-align: center;
		font-size: 0.8rem;
		padding: 0.4rem;
		font-family: var(--font-sans);
		border-bottom: 1px solid var(--color-border);
	}
</style>
