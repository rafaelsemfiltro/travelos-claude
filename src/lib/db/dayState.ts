// claude: read/write helpers for the per-day persisted user state (localStorage)
import { CURRENT_SCHEMA_VERSION, storageKey } from './index';
import { migrate } from './migrations';
import type { DayState } from '$lib/types';

function emptyState(dayId: string): DayState {
	return {
		dayId,
		schemaVersion: CURRENT_SCHEMA_VERSION,
		checklist: {},
		updatedAt: new Date().toISOString()
	};
}

export async function loadDayState(dayId: string): Promise<DayState> {
	if (typeof localStorage === 'undefined') return emptyState(dayId);
	const raw = localStorage.getItem(storageKey(dayId));
	if (!raw) return emptyState(dayId);
	try {
		const parsed = JSON.parse(raw) as DayState;
		return parsed.schemaVersion < CURRENT_SCHEMA_VERSION
			? migrate(parsed, CURRENT_SCHEMA_VERSION)
			: parsed;
	} catch {
		return emptyState(dayId);
	}
}

export async function saveDayState(state: DayState): Promise<void> {
	if (typeof localStorage === 'undefined') return;
	const next: DayState = { ...state, updatedAt: new Date().toISOString() };
	localStorage.setItem(storageKey(state.dayId), JSON.stringify(next));
}
