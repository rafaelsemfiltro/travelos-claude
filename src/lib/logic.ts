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
