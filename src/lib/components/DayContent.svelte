<!-- claude: activity timeline + transport + accommodation + alerts for one day -->
<script lang="ts">
	import type { ContingencyLevel, TripDay } from '$lib/types';
	import {
		ACTIVITY_STATUS_BADGE,
		TRANSPORT_ICON,
		activitiesForContingency,
		formatMoney,
		sortedTransports
	} from '$lib/logic';

	let { day, active }: { day: TripDay; active: ContingencyLevel } = $props();

	let activities = $derived(activitiesForContingency(day, active));
	let transports = $derived(sortedTransports(day));
</script>

{#if day.alerts?.length}
	<div class="alerts">
		{#each day.alerts as alert}
			<p><span class="alert-icon">⚠️</span>{alert}</p>
		{/each}
	</div>
{/if}

<ul class="timeline">
	{#each activities as a (a.id)}
		<li
			class="status-{a.status}"
			class:optional={a.status === 'optional'}
			class:cancelled={a.status === 'cancelled'}
		>
			<div class="row">
				{#if a.time}<span class="time">🕐 {a.time}</span>{/if}
				<span class="title">{a.title}</span>
				<span class="status-badge">{ACTIVITY_STATUS_BADGE[a.status]}</span>
			</div>
			{#if a.description}<span class="notes">{a.description}</span>{/if}
			{#if a.location}
				<span class="location">
					📍 {a.location.name}
					{#if a.location.nameChinese}<span class="chinese">{a.location.nameChinese}</span>{/if}
					{#if a.location.mapUrl}
						<a class="map-link" href={a.location.mapUrl} target="_blank" rel="noreferrer">Ver no mapa</a>
					{/if}
				</span>
			{/if}
			<div class="tags">
				{#if a.costEstimate}<span class="cost">{formatMoney(a.costEstimate)}</span>{/if}
				{#if a.droneAllowed === true}
					<span class="badge drone-ok">🚁 Drone permitido</span>
				{:else if a.droneAllowed === false}
					<span class="badge drone-no">🚫 Drone proibido</span>
				{/if}
			</div>
			{#if a.notes}<span class="notes">{a.notes}</span>{/if}
		</li>
	{:else}
		<li class="empty">Sem atividades neste plano.</li>
	{/each}
</ul>

{#if transports.length}
	<h3>🧭 Transporte</h3>
	<ul class="transports">
		{#each transports as t (t.id)}
			<li>
				<div class="row">
					<span class="icon">{TRANSPORT_ICON[t.type]}</span>
					<span class="time">{t.time}</span>
					<span class="route">{t.from} → {t.to}</span>
					<span class="status status-{t.status}">{t.status}</span>
				</div>
				<div class="row-sub">
					{#if t.code}<span class="code">{t.code}</span>{/if}
					{#if t.cost}<span class="cost">{formatMoney(t.cost)}</span>{/if}
				</div>
				{#if t.notes}<span class="notes">{t.notes}</span>{/if}
			</li>
		{/each}
	</ul>
{/if}

{#if day.accommodation}
	<h3>🛏️ Hospedagem</h3>
	<div class="accommodation">
		<div class="row">
			<span class="acc-name">{day.accommodation.name}</span>
			<span class="status status-{day.accommodation.status}">{day.accommodation.status}</span>
		</div>
		<span class="notes">{day.accommodation.location}</span>
		{#if day.accommodation.checkIn}<span class="notes">Check-in: {day.accommodation.checkIn}</span>{/if}
		{#if day.accommodation.checkOut}<span class="notes">Check-out: {day.accommodation.checkOut}</span
			>{/if}
		{#if day.accommodation.notes}<span class="notes">{day.accommodation.notes}</span>{/if}
	</div>
{/if}

<style>
	.alerts {
		background: var(--color-warning-soft);
		border: 1px solid rgba(245, 158, 11, 0.4);
		border-radius: var(--radius-md);
		padding: 0.75rem 0.9rem;
		margin: 1rem 0;
	}
	.alerts p {
		margin: 0.25rem 0;
		font-size: 0.85rem;
		color: var(--color-warning-text);
		display: flex;
		gap: 0.4rem;
		line-height: 1.4;
	}
	.alert-icon {
		flex-shrink: 0;
	}
	.timeline {
		list-style: none;
		padding: 0;
		margin: 1rem 0;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}
	.timeline li {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		padding: 0.75rem 0.9rem;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		border-left: 3px solid var(--color-accent);
		box-shadow: var(--shadow-sm);
	}
	.timeline li.status-pending {
		border-left-color: var(--color-warning);
	}
	.timeline li.optional {
		border-left-color: var(--color-text-subtle);
		opacity: 0.85;
	}
	.timeline li.cancelled {
		border-left-color: var(--color-danger);
		text-decoration: line-through;
		opacity: 0.55;
	}
	.timeline li.empty {
		border-left-color: var(--color-border-strong);
		color: var(--color-text-muted);
		text-decoration: none;
		opacity: 1;
		box-shadow: none;
	}
	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
	}
	.row-sub {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.time {
		font-size: 0.75rem;
		color: var(--color-accent-text);
		font-weight: 700;
		background: var(--color-accent-soft);
		padding: 0.15rem 0.5rem;
		border-radius: 999px;
	}
	.title {
		font-weight: 600;
		font-size: 0.95rem;
	}
	.notes {
		font-size: 0.8rem;
		color: var(--color-text-muted);
		line-height: 1.4;
	}
	.status-badge {
		margin-left: auto;
		font-size: 0.95rem;
	}
	.location {
		font-size: 0.8rem;
		color: #cbd5e1;
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		align-items: center;
	}
	.chinese {
		color: var(--color-text-muted);
	}
	.map-link {
		color: var(--color-accent-text);
		font-size: 0.75rem;
		font-weight: 600;
		text-decoration: none;
		border-bottom: 1px solid currentColor;
	}
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}
	.cost {
		font-size: 0.75rem;
		color: var(--color-warning-text);
		background: var(--color-warning-soft);
		padding: 0.15rem 0.5rem;
		border-radius: 999px;
		align-self: flex-start;
	}
	.badge {
		align-self: flex-start;
		font-size: 0.75rem;
		padding: 0.15rem 0.5rem;
		border-radius: 999px;
		background: var(--color-surface-2);
	}
	.drone-ok {
		color: var(--color-success-text);
		background: var(--color-success-soft);
	}
	.drone-no {
		color: var(--color-danger-text);
		background: var(--color-danger-soft);
	}
	h3 {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		margin: 1.5rem 0 0.6rem;
		color: var(--color-text-muted);
		font-weight: 700;
	}
	.transports {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.transports li {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		padding: 0.7rem 0.9rem;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		font-size: 0.85rem;
		box-shadow: var(--shadow-sm);
	}
	.icon {
		font-size: 1.1rem;
	}
	.route {
		font-weight: 600;
	}
	.code {
		font-size: 0.75rem;
		color: var(--color-text-muted);
		background: var(--color-surface-2);
		padding: 0.1rem 0.45rem;
		border-radius: 999px;
	}
	.status {
		margin-left: auto;
		font-size: 0.68rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		padding: 0.15rem 0.5rem;
		border-radius: 999px;
		background: var(--color-surface-2);
		color: var(--color-text-muted);
	}
	.status-paid,
	.status-confirmed {
		background: var(--color-success-soft);
		color: var(--color-success-text);
	}
	.status-pending {
		background: var(--color-warning-soft);
		color: var(--color-warning-text);
	}
	.status-critical {
		background: var(--color-danger-soft);
		color: var(--color-danger-text);
	}
	.accommodation {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 0.8rem 0.9rem;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-sm);
	}
	.acc-name {
		font-weight: 700;
		font-size: 0.95rem;
	}
</style>
