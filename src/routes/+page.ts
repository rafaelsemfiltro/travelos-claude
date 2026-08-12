// claude
import { allDays } from '$lib/data/days';

export const prerender = true;

export function load() {
	return { days: allDays };
}
