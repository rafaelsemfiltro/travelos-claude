// claude: localStorage-backed persistence (swapped from Dexie to stay within the bundle budget)
export const CURRENT_SCHEMA_VERSION = 1;

const KEY_PREFIX = 'travelos:dayState:';

export function storageKey(dayId: string): string {
	return `${KEY_PREFIX}${dayId}`;
}
