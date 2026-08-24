// claude
import { allDays } from '$lib/data/days';
import { trip } from '$lib/data/trip';

export const prerender = true;

export function load() {
	return { days: allDays, trip };
}
