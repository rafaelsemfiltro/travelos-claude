<script lang="ts">
	const version = '0.1.0';
</script>

<svelte:head>
	<title>TravelOS</title>
</svelte:head>

<main>
	<h1>TravelOS</h1>
	<p>PWA offline-first — Ásia 2026</p>
	<p class="version">v{version}</p>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100dvh;
		font-family: system-ui, sans-serif;
		background: #0f172a;
		color: #f8fafc;
		gap: 0.5rem;
	}
	h1 { font-size: 2rem; margin: 0; }
	p { margin: 0; color: #94a3b8; }
	.version { font-size: 0.75rem; }
</style>
