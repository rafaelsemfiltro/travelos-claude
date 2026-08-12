<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
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

<style>
	.offline-banner {
		position: sticky;
		top: 0;
		z-index: 9998;
		background: #92400e;
		color: #fde68a;
		text-align: center;
		font-size: 0.8rem;
		padding: 0.4rem;
		font-family: system-ui, sans-serif;
	}
</style>
