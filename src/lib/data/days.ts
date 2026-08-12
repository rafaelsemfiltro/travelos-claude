// claude: static seed data loaded at build time from data/asia-2026/*.json
import type { TripDay } from '$lib/types';

const modules = import.meta.glob('/data/asia-2026/*.json', { eager: true }) as Record<
	string,
	{ default: TripDay }
>;

export const allDays: TripDay[] = Object.values(modules)
	.map((m) => m.default)
	.sort((a, b) => a.dayNumber - b.dayNumber);

export function getDayById(id: string): TripDay | undefined {
	return allDays.find((d) => d.id === id);
}
