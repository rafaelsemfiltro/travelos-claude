<!-- claude: fixed mobile bottom tab bar — Hoje / Roteiro -->
<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';

	const homeHref = `${base}/`;
	const roteiroHref = `${base}/roteiro`;

	let path = $derived(page.url.pathname);
	let onHome = $derived(path === homeHref || path === base || path === `${base}`);
	let onRoteiro = $derived(path.startsWith(roteiroHref) || path.startsWith(`${base}/dia`));
</script>

<nav class="bottom-nav" aria-label="Navegação principal">
	<a href={homeHref} class:active={onHome} aria-current={onHome ? 'page' : undefined}>
		<span class="icon">🏠</span>
		<span class="label">Hoje</span>
	</a>
	<a href={roteiroHref} class:active={onRoteiro} aria-current={onRoteiro ? 'page' : undefined}>
		<span class="icon">🗺️</span>
		<span class="label">Roteiro</span>
	</a>
</nav>

<style>
	.bottom-nav {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 500;
		display: flex;
		height: calc(var(--nav-height) + var(--safe-bottom));
		padding-bottom: var(--safe-bottom);
		background: rgba(15, 23, 42, 0.88);
		backdrop-filter: blur(14px);
		border-top: 1px solid var(--color-border);
	}
	.bottom-nav a {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.2rem;
		text-decoration: none;
		color: var(--color-text-subtle);
		font-size: 0.7rem;
		font-weight: 600;
		transition: color 0.15s ease;
	}
	.bottom-nav a.active {
		color: var(--color-accent-text);
	}
	.icon {
		font-size: 1.3rem;
		line-height: 1;
	}
</style>
