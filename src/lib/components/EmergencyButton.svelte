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
		bottom: 1rem;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		background: #dc2626;
		color: #fff;
		font-size: 1.25rem;
		text-decoration: none;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
	}
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 9998;
		background: rgba(0, 0, 0, 0.5);
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
		background: #0f172a;
		color: #f8fafc;
		font-family: system-ui, sans-serif;
		border-radius: 1rem 1rem 0 0;
		padding: 1rem 1.25rem 1.5rem;
		box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.5);
	}
	.panel-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}
	.panel-header h2 {
		font-size: 1.1rem;
		margin: 0;
	}
	.close {
		background: none;
		border: none;
		color: #94a3b8;
		font-size: 1.1rem;
		padding: 0.25rem;
		cursor: pointer;
	}
	section {
		margin-top: 1rem;
	}
	section h3 {
		font-size: 0.85rem;
		color: #93c5fd;
		margin: 0 0 0.4rem;
	}
	section p {
		font-size: 0.85rem;
		color: #cbd5e1;
		margin: 0;
	}
	section ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}
	section li {
		font-size: 0.85rem;
		color: #cbd5e1;
	}
	section a {
		color: #93c5fd;
	}
</style>
