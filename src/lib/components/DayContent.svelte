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
			<p>⚠️ {alert}</p>
		{/each}
	</div>
{/if}

<ul class="timeline">
	{#each activities as a (a.id)}
		<li class:optional={a.status === 'optional'} class:cancelled={a.status === 'cancelled'}>
			<div class="row">
				{#if a.time}<span class="time">{a.time}</span>{/if}
				<span class="title">{a.title}</span>
				<span class="status-badge">{ACTIVITY_STATUS_BADGE[a.status]}</span>
			</div>
			{#if a.description}<span class="notes">{a.description}</span>{/if}
			{#if a.location}
				<span class="location">
					{a.location.name}
					{#if a.location.nameChinese}<span class="chinese">{a.location.nameChinese}</span>{/if}
					{#if a.location.mapUrl}
						<a class="map-link" href={a.location.mapUrl} target="_blank" rel="noreferrer">Ver no mapa</a>
					{/if}
				</span>
			{/if}
			{#if a.costEstimate}<span class="cost">{formatMoney(a.costEstimate)}</span>{/if}
			{#if a.droneAllowed === true}
				<span class="badge drone-ok">🚁 Drone permitido</span>
			{:else if a.droneAllowed === false}
				<span class="badge drone-no">🚫 Drone proibido</span>
			{/if}
			{#if a.notes}<span class="notes">{a.notes}</span>{/if}
		</li>
	{:else}
		<li class="empty">Sem atividades neste plano.</li>
	{/each}
</ul>

{#if transports.length}
	<h3>Transporte</h3>
	<ul class="transports">
		{#each transports as t (t.id)}
			<li>
				<div class="row">
					<span class="icon">{TRANSPORT_ICON[t.type]}</span>
					<span class="time">{t.time}</span>
					<span>{t.from} → {t.to}</span>
					{#if t.code}<span class="code">{t.code}</span>{/if}
					<span class="status">{t.status}</span>
				</div>
				{#if t.cost}<span class="cost">{formatMoney(t.cost)}</span>{/if}
				{#if t.notes}<span class="notes">{t.notes}</span>{/if}
			</li>
		{/each}
	</ul>
{/if}

{#if day.accommodation}
	<h3>Hospedagem</h3>
	<p class="accommodation">
		{day.accommodation.name} — {day.accommodation.location} ({day.accommodation.status})
		{#if day.accommodation.checkIn}<br />Check-in: {day.accommodation.checkIn}{/if}
		{#if day.accommodation.checkOut}<br />Check-out: {day.accommodation.checkOut}{/if}
		{#if day.accommodation.notes}<br />{day.accommodation.notes}{/if}
	</p>
{/if}

<style>
	.alerts {
		background: #451a03;
		border: 1px solid #92400e;
		border-radius: 0.5rem;
		padding: 0.75rem;
		margin: 1rem 0;
	}
	.alerts p {
		margin: 0.25rem 0;
		font-size: 0.85rem;
		color: #fde68a;
	}
	.timeline {
		list-style: none;
		padding: 0;
		margin: 1rem 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.timeline li {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		padding: 0.6rem 0.75rem;
		background: #1e293b;
		border-radius: 0.5rem;
		border-left: 3px solid #2563eb;
	}
	.timeline li.optional {
		border-left-color: #64748b;
		opacity: 0.85;
	}
	.timeline li.cancelled {
		text-decoration: line-through;
		opacity: 0.5;
	}
	.timeline li.empty {
		border-left-color: #334155;
		color: #94a3b8;
	}
	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.4rem;
	}
	.time {
		font-size: 0.75rem;
		color: #93c5fd;
		font-weight: 600;
	}
	.notes {
		font-size: 0.8rem;
		color: #94a3b8;
	}
	.status-badge {
		margin-left: auto;
		font-size: 0.85rem;
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
		color: #94a3b8;
	}
	.map-link {
		color: #93c5fd;
		font-size: 0.75rem;
	}
	.cost {
		font-size: 0.8rem;
		color: #fde68a;
	}
	.badge {
		align-self: flex-start;
		font-size: 0.75rem;
		padding: 0.15rem 0.5rem;
		border-radius: 999px;
		background: #334155;
	}
	.drone-ok {
		color: #86efac;
	}
	.drone-no {
		color: #fca5a5;
	}
	h3 {
		font-size: 0.95rem;
		margin: 1.25rem 0 0.5rem;
		color: #cbd5e1;
	}
	.transports {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}
	.transports li {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		padding: 0.5rem 0.75rem;
		background: #1e293b;
		border-radius: 0.5rem;
		font-size: 0.85rem;
	}
	.icon {
		font-size: 0.9rem;
	}
	.status {
		margin-left: auto;
		color: #94a3b8;
		text-transform: uppercase;
		font-size: 0.7rem;
	}
	.accommodation {
		font-size: 0.85rem;
		color: #cbd5e1;
	}
</style>
