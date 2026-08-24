<!-- claude: persistent emergency access button + expandable SOS panel -->
<script lang="ts">
	let open = $state(false);

	const numbers: { country: string; police: string; medical: string }[] = [
		{ country: 'China', police: '110', medical: '120' },
		{ country: 'Japão', police: '110', medical: '119' },
		{ country: 'Tailândia', police: '191', medical: '1669' },
		{ country: 'Turquia', police: '155', medical: '112' }
	];

	const embassies: { country: string; url: string }[] = [
		{ country: 'China (Pequim)', url: 'https://www.gov.br/mre/pt-br/embaixada-pequim' },
		{ country: 'Japão (Tóquio)', url: 'https://www.gov.br/mre/pt-br/embaixada-toquio' },
		{ country: 'Tailândia (Bangcoc)', url: 'https://www.gov.br/mre/pt-br/embaixada-bangkok' },
		{ country: 'Turquia (Ancara)', url: 'https://www.gov.br/mre/pt-br/embaixada-ancara' }
	];

	function toggle() {
		open = !open;
	}

	function close() {
		open = false;
	}
</script>

<a class="emergency-btn" href="#emergency" aria-label="Emergência" onclick={(e) => { e.preventDefault(); toggle(); }}>
	🆘
</a>

{#if open}
	<button type="button" class="backdrop" aria-label="Fechar" onclick={close}></button>
	<div class="panel" role="dialog" aria-label="Emergência">
		<div class="panel-header">
			<h2>🆘 Emergência</h2>
			<button type="button" class="close" aria-label="Fechar" onclick={close}>✕</button>
		</div>

		<section>
			<h3>Polícia / Ambulância</h3>
			<ul>
				{#each numbers as n (n.country)}
					<li><strong>{n.country}</strong> — Polícia {n.police} · Ambulância {n.medical}</li>
				{/each}
			</ul>
		</section>

		<section>
			<h3>Seguro viagem</h3>
			<p>Consulte seu voucher de seguro.</p>
		</section>

		<section>
			<h3>Embaixada do Brasil</h3>
			<ul>
				{#each embassies as e (e.country)}
					<li><a href={e.url} target="_blank" rel="noreferrer">{e.country}</a></li>
				{/each}
			</ul>
		</section>
	</div>
{/if}

<style>
	.emergency-btn {
		position: fixed;
		right: 1rem;
		bottom: calc(var(--nav-height) + var(--safe-bottom) + 0.85rem);
		z-index: 550;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3.25rem;
		height: 3.25rem;
		border-radius: 50%;
		background: linear-gradient(155deg, #ef4444, #b91c1c);
		color: #fff;
		font-size: 1.35rem;
		text-decoration: none;
		box-shadow: var(--shadow-lg);
		border: 2px solid rgba(255, 255, 255, 0.12);
	}
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 9998;
		background: rgba(0, 0, 0, 0.55);
		border: none;
		padding: 0;
		cursor: default;
	}
	.panel {
		position: fixed;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 9999;
		max-height: 80dvh;
		overflow-y: auto;
		background: var(--color-bg-alt);
		color: var(--color-text);
		font-family: var(--font-sans);
		border-radius: var(--radius-lg) var(--radius-lg) 0 0;
		padding: 1.1rem 1.25rem calc(1.5rem + var(--safe-bottom));
		box-shadow: var(--shadow-lg);
		border: 1px solid var(--color-border);
		border-bottom: none;
	}
	.panel-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}
	.panel-header h2 {
		font-size: 1.15rem;
		margin: 0;
		font-weight: 800;
	}
	.close {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: 50%;
		width: 2rem;
		height: 2rem;
		color: var(--color-text-muted);
		font-size: 1rem;
		padding: 0;
		cursor: pointer;
	}
	section {
		margin-top: 1rem;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: 0.75rem 0.9rem;
	}
	section h3 {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--color-accent-text);
		margin: 0 0 0.5rem;
		font-weight: 700;
	}
	section p {
		font-size: 0.85rem;
		color: var(--color-text-muted);
		margin: 0;
	}
	section ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.45rem;
	}
	section li {
		font-size: 0.85rem;
		color: var(--color-text-muted);
	}
	section a {
		color: var(--color-accent-text);
		text-decoration: none;
		font-weight: 600;
	}
</style>
