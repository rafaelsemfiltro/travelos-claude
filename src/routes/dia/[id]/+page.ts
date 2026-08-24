// claude
import { error } from '@sveltejs/kit';
import { allDays, getDayById } from '$lib/data/days';
import type { EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => allDays.map((d) => ({ id: d.id }));

export function load({ params }: { params: { id: string } }) {
	const day = getDayById(params.id);
	if (!day) error(404, 'Dia não encontrado');
	const index = allDays.findIndex((d) => d.id === day.id);
	const previous = index > 0 ? allDays[index - 1] : undefined;
	const next = index >= 0 && index < allDays.length - 1 ? allDays[index + 1] : undefined;
	return { day, previous, next };
}
