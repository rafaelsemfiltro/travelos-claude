// claude: pure helpers shared by the Hoje and Dia views
import type {
	Activity,
	ActivityStatus,
	ContingencyLevel,
	Money,
	Transport,
	TripDay,
	WakeFeeling
} from '$lib/types';

const WAKE_TO_CONTINGENCY: Record<WakeFeeling, ContingencyLevel> = {
	rested: 'A',
	ok: 'B',
	rough: 'C'
};

export function suggestContingency(feeling: WakeFeeling, day: TripDay): ContingencyLevel {
	const desired = WAKE_TO_CONTINGENCY[feeling];
	const levels = day.contingencies.map((c) => c.level);
	if (levels.includes(desired)) return desired;
	return levels[0] ?? 'A';
}

function byTime<T extends { time?: string }>(a: T, b: T): number {
	if (!a.time && !b.time) return 0;
	if (!a.time) return 1;
	if (!b.time) return -1;
	return a.time.localeCompare(b.time);
}

export function activitiesForContingency(day: TripDay, level: ContingencyLevel): Activity[] {
	return day.activities.filter((a) => a.contingency.includes(level)).sort(byTime);
}

export function sortedTransports(day: TripDay): Transport[] {
	return [...day.transports].sort(byTime);
}

export const ACTIVITY_PRIORITY_LABEL: Record<ActivityStatus, string> = {
	confirmed: 'Essencial',
	pending: 'A confirmar',
	optional: 'Opcional',
	cancelled: 'Cancelado'
};

export const TRANSPORT_PRIORITY_LABEL: Record<Transport['status'], string> = {
	paid: 'Essencial',
	confirmed: 'Essencial',
	pending: 'A confirmar',
	critical: 'Hora-limite'
};

export const DEADLINE_CONSEQUENCE: Record<Transport['type'], string> = {
	flight: 'Perder o embarque compromete toda a conexão do dia.',
	train: 'Perder o trem obriga replanejar a rota do dia.',
	ferry: 'A balsa não espera — perder o horário atrasa a travessia.',
	'cable-car': 'Última subida do teleférico — não há alternativa depois.',
	bus: 'O ônibus não espera — perder o horário atrasa o trajeto.',
	taxi: 'Horário combinado — atraso pode custar a corrida.',
	metro: 'Intervalo apertado — atraso compromete a conexão seguinte.',
	other: 'Horário crítico do dia — evite atrasos.'
};

export interface TimelineEntry {
	id: string;
	time?: string;
	title: string;
	subtitle?: string;
	kind: 'activity' | 'transport';
	statusLabel: string;
	activity?: Activity;
	transport?: Transport;
}

/** Chronological merge of a day's activities (for the given plan) and transports. */
export function mergedTimeline(day: TripDay, level: ContingencyLevel): TimelineEntry[] {
	const acts: TimelineEntry[] = activitiesForContingency(day, level).map((a) => ({
		id: a.id,
		time: a.time,
		title: a.title,
		subtitle: a.location?.name,
		kind: 'activity',
		statusLabel: ACTIVITY_PRIORITY_LABEL[a.status],
		activity: a
	}));
	const trans: TimelineEntry[] = sortedTransports(day).map((t) => ({
		id: t.id,
		time: t.time,
		title: `${TRANSPORT_ICON[t.type]} ${t.from} → ${t.to}`,
		subtitle: t.code,
		kind: 'transport',
		statusLabel: TRANSPORT_PRIORITY_LABEL[t.status],
		transport: t
	}));
	return [...acts, ...trans].sort(byTime);
}

export function nowHHMM(): string {
	const d = new Date();
	return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

/** The next timed entry at or after `now`, falling back to the day's last timed entry. */
export function nextAction(
	day: TripDay,
	level: ContingencyLevel,
	now: string = nowHHMM()
): (TimelineEntry & { isPast: boolean }) | undefined {
	const timed = mergedTimeline(day, level).filter((e) => e.time);
	if (!timed.length) return undefined;
	const upcoming = timed.find((e) => e.time! >= now);
	if (upcoming) return { ...upcoming, isPast: false };
	return { ...timed[timed.length - 1], isPast: true };
}

const HARD_DEADLINE_TYPES = new Set<Transport['type']>(['flight', 'train', 'ferry', 'cable-car']);

/** The day's rigid, must-not-miss transport moment, if any. */
export function protectedDeadline(day: TripDay, level: ContingencyLevel): TimelineEntry | undefined {
	const timed = mergedTimeline(day, level).filter((e) => e.time && e.transport);
	const critical = timed.find((e) => e.transport?.status === 'critical');
	if (critical) return critical;
	return timed.find((e) => e.transport && HARD_DEADLINE_TYPES.has(e.transport.type));
}

/** Coarse day-level status derived from its transports/activities/accommodation. */
export function dayStatusLabel(day: TripDay): string {
	if (day.transports.some((t) => t.status === 'critical')) return 'atenção';
	if (day.transports.some((t) => t.status === 'pending')) return 'pendente';
	if (day.accommodation?.status === 'pending') return 'pendente';
	if (day.activities.some((a) => a.status === 'pending')) return 'pendente';
	return 'confirmado';
}

export function todayISO(): string {
	const d = new Date();
	const y = d.getFullYear();
	const m = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');
	return `${y}-${m}-${day}`;
}

export function findDayByDate(days: TripDay[], date: string): TripDay | undefined {
	return days.find((d) => d.date === date);
}

export const ENERGY_BADGE: Record<TripDay['energyRequired'], string> = {
	high: '🔴',
	medium: '🟡',
	low: '🟢'
};

export const WAKE_EMOJI: Record<WakeFeeling, string> = {
	rough: '😴',
	ok: '😐',
	rested: '💪'
};

export const TRANSPORT_ICON: Record<Transport['type'], string> = {
	flight: '✈️',
	train: '🚄',
	bus: '🚌',
	ferry: '⛴️',
	taxi: '🚕',
	metro: '🚇',
	'cable-car': '🚠',
	other: '🚗'
};

export const ACTIVITY_STATUS_BADGE: Record<ActivityStatus, string> = {
	confirmed: '✅',
	optional: '⚪',
	pending: '⏳',
	cancelled: '🚫'
};

export function formatMoney(money: Money): string {
	if (money.amount === 0) return 'Grátis';
	return `${money.currency} ${money.amount.toLocaleString('pt-BR')}`;
}

export interface TripProgress {
	/** 1-based index of today within the trip, or 0 if outside its date range */
	current: number;
	total: number;
	percent: number; // 0-100, clamped
}

export function tripProgress(days: TripDay[], todayIso: string): TripProgress {
	const total = days.length;
	const start = days[0]?.date;
	const end = days[total - 1]?.date;
	if (!start || !end || todayIso < start) return { current: 0, total, percent: 0 };
	if (todayIso > end) return { current: total, total, percent: 100 };
	const idx = days.findIndex((d) => d.date === todayIso);
	const current = idx >= 0 ? idx + 1 : 0;
	const percent = current ? Math.round((current / total) * 100) : 0;
	return { current, total, percent };
}
