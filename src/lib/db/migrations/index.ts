// claude: schemaVersion migrations for DayState records.
// Each migration bumps a record forward by one schemaVersion. Add new
// entries here as the DayState shape evolves — never bump
// CURRENT_SCHEMA_VERSION in db/index.ts without adding the matching step.
import type { DayState } from '$lib/types';

type Migration = (state: DayState) => DayState;

const migrations: Record<number, Migration> = {
	// 1: initial schema — no-op, present for symmetry.
};

export function migrate(state: DayState, targetVersion: number): DayState {
	let next = state;
	for (let v = state.schemaVersion + 1; v <= targetVersion; v++) {
		const step = migrations[v];
		if (step) next = step(next);
	}
	return { ...next, schemaVersion: targetVersion };
}
