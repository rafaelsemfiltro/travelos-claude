<!-- claude: página de mapas offline por destino — TravelOS Ásia 2026 -->
<script lang="ts">
	import { destinos, paisesOrdenados, destinosPorPais } from '$lib/data/mapas';
	import type { LinkMapa } from '$lib/data/mapas';

	const tipoLabel: Record<LinkMapa['tipo'], string> = {
		google: 'Google Maps',
		'mapas-me': 'Maps.me',
		baidu: 'Baidu Maps',
		other: 'Abrir mapa'
	};

	const tipoCor: Record<LinkMapa['tipo'], string> = {
		google: 'btn-google',
		'mapas-me': 'btn-mapsme',
		baidu: 'btn-baidu',
		other: 'btn-other'
	};

	function diaLabel(inicio: string, fim: string): string {
		const n1 = parseInt(inicio.replace('dia-', ''), 10);
		const n2 = parseInt(fim.replace('dia-', ''), 10);
		return n1 === n2 ? `Dia ${n1}` : `Dias ${n1}–${n2}`;
	}

	const chinaCities = destinos.filter((d) => d.pais === 'China');
</script>

<svelte:head>
	<title>Mapas — TravelOS</title>
</svelte:head>

<div class="page">
	<!-- header -->
	<header class="page-header">
		<h1>🗺️ Mapas</h1>
		<p class="subtitle">Links para mapas offline por destino</p>
	</header>

	<!-- maps.me banner -->
	<div class="banner-mapsme">
		<span class="banner-icon">📲</span>
		<div class="banner-text">
			<strong>Instale o Maps.me antes de viajar</strong>
			<span>Funciona offline e na China. Baixe os mapas de cada cidade com Wi-Fi.</span>
		</div>
		<a href="https://maps.me/" target="_blank" rel="noopener noreferrer" class="banner-btn">
			Baixar
		</a>
	</div>

	<!-- china warning -->
	{#if chinaCities.length > 0}
		<div class="banner-china">
			<span class="banner-icon">🇨🇳</span>
			<div class="banner-text">
				<strong>China: Google Maps bloqueado</strong>
				<span>Baixe os mapas do Maps.me antes de entrar na China. Use Baidu Maps como alternativa.</span>
			</div>
		</div>
	{/if}

	<!-- destinations by country -->
	<main class="content">
		{#each paisesOrdenados as pais}
			{@const grupo = destinosPorPais[pais]}
			{@const flagEmoji = grupo[0].emoji}

			<section class="country-section">
				<h2 class="country-header">
					<span class="flag">{flagEmoji}</span>
					{pais}
				</h2>

				<div class="cards">
					{#each grupo as destino (destino.id)}
						<article class="card" class:card-china={destino.pais === 'China'}>
							{#if destino.alertaOffline}
								<div class="alerta-china">
									{destino.alertaOffline}
								</div>
							{/if}

							<div class="card-header">
								<div>
									<h3 class="cidade">{destino.cidade}</h3>
									<span class="dias-chip">{diaLabel(destino.diaInicio, destino.diaFim)}</span>
								</div>
							</div>

							<div class="links">
								{#each destino.links as link}
									<a
										href={link.url}
										target="_blank"
										rel="noopener noreferrer"
										class="map-btn {tipoCor[link.tipo]}"
									>
										{link.label}
									</a>
								{/each}
							</div>
						</article>
					{/each}
				</div>
			</section>
		{/each}
	</main>

	<div class="bottom-spacer"></div>
</div>

<style>
	.page {
		min-height: 100dvh;
		background: var(--color-bg);
		padding-bottom: calc(var(--nav-height) + var(--safe-bottom) + 1rem);
	}

	/* header */
	.page-header {
		padding: 1.25rem 1.25rem 0.75rem;
		background: var(--color-surface);
		border-bottom: 1px solid var(--color-border);
	}
	h1 {
		margin: 0;
		font-size: 1.6rem;
		font-weight: 700;
		color: var(--color-accent);
		letter-spacing: -0.02em;
	}
	.subtitle {
		margin: 0.2rem 0 0;
		font-size: 0.82rem;
		color: var(--color-text-subtle);
	}

	/* banners */
	.banner-mapsme,
	.banner-china {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.85rem 1.25rem;
		border-bottom: 1px solid var(--color-border);
	}
	.banner-mapsme {
		background: var(--color-accent-soft);
	}
	.banner-china {
		background: var(--color-danger-soft);
	}
	.banner-icon {
		font-size: 1.5rem;
		flex-shrink: 0;
	}
	.banner-text {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}
	.banner-text strong {
		font-size: 0.85rem;
		color: var(--color-text);
	}
	.banner-text span {
		font-size: 0.75rem;
		color: var(--color-text-muted);
		line-height: 1.4;
	}
	.banner-btn {
		flex-shrink: 0;
		background: var(--color-accent);
		color: #fff;
		font-size: 0.78rem;
		font-weight: 700;
		padding: 0.4rem 0.85rem;
		border-radius: 999px;
		text-decoration: none;
		white-space: nowrap;
	}

	/* content */
	.content {
		padding: 1rem 1rem 0;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	/* country section */
	.country-section {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}
	.country-header {
		margin: 0;
		font-size: 0.8rem;
		font-weight: 700;
		color: var(--color-text-subtle);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}
	.flag {
		font-size: 1rem;
	}

	/* cards */
	.cards {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}
	.card {
		background: var(--color-surface);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-sm);
		padding: 0.9rem 1rem;
		border-left: 4px solid var(--color-border-strong);
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
	}
	.card-china {
		border-left-color: var(--color-danger);
	}

	/* china alert inside card */
	.alerta-china {
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--color-danger-text);
		background: var(--color-danger-soft);
		border-radius: var(--radius-sm);
		padding: 0.35rem 0.6rem;
	}

	.card-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}
	.cidade {
		margin: 0 0 0.25rem;
		font-size: 1rem;
		font-weight: 700;
		color: var(--color-text);
	}
	.dias-chip {
		font-size: 0.72rem;
		font-weight: 600;
		color: var(--color-text-muted);
		background: var(--color-surface-2);
		padding: 0.15rem 0.5rem;
		border-radius: 999px;
	}

	/* link buttons */
	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.map-btn {
		display: inline-flex;
		align-items: center;
		font-size: 0.78rem;
		font-weight: 700;
		padding: 0.45rem 0.85rem;
		border-radius: 999px;
		text-decoration: none;
		transition: opacity 0.15s;
		white-space: nowrap;
	}
	.map-btn:active {
		opacity: 0.75;
	}

	.btn-google {
		background: #e8f0fe;
		color: #1a73e8;
	}
	.btn-mapsme {
		background: var(--color-accent-soft);
		color: var(--color-accent-text);
	}
	.btn-baidu {
		background: #fff0e6;
		color: #c0392b;
	}
	.btn-other {
		background: var(--color-surface-2);
		color: var(--color-text-muted);
	}

	.bottom-spacer {
		height: 1rem;
	}
</style>
