// claude: trip metadata loaded at build time from data/trip.json, combined with day data
import type { Trip } from '$lib/types';
import tripMeta from '../../../data/trip.json';
import { allDays } from './days';

export const trip: Trip = { ...tripMeta, days: allDays };
