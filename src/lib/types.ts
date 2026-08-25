// claude: core domain types for TravelOS MVP-0

export type EnergyLevel = 'high' | 'medium' | 'low';
export type WakeFeeling = 'rested' | 'ok' | 'rough'; // 💪/😐/😴
export type ContingencyLevel = 'A' | 'B' | 'C' | 'D';
export type ActivityStatus = 'confirmed' | 'pending' | 'optional' | 'cancelled';
export type Currency = 'BRL' | 'USD' | 'THB' | 'VND' | 'CNY' | 'TRY';

export interface Money {
	amount: number; // integer, smallest unit (centavos, cents, satang, dong, fen, kuruş)
	currency: Currency;
}

export interface Location {
	name: string;
	nameChinese?: string; // for China destinations
	lat?: number;
	lng?: number;
	mapUrl?: string; // Amap deep link for China, Google Maps otherwise
}

export interface Activity {
	id: string;
	time?: string; // "HH:MM"
	title: string;
	description?: string;
	location?: Location;
	contingency: ContingencyLevel[]; // which plans include this activity
	status: ActivityStatus;
	costEstimate?: Money;
	notes?: string;
	droneAllowed?: boolean | null; // null = unknown
}

export interface Transport {
	id: string;
	time: string;
	type: 'flight' | 'train' | 'bus' | 'ferry' | 'taxi' | 'metro' | 'cable-car' | 'other';
	from: string;
	to: string;
	code?: string; // flight/train number
	status: 'paid' | 'confirmed' | 'pending' | 'critical';
	notes?: string;
	cost?: Money;
}

export interface Accommodation {
	name: string;
	location: string;
	checkIn?: string;
	checkOut?: string;
	status: 'paid' | 'reserved' | 'pending';
	notes?: string;
}

export interface Contingency {
	level: ContingencyLevel;
	label: string; // e.g. "A — acordou cedo e bem"
	description: string;
}

export interface TripDay {
	id: string; // "dia-01" … "dia-25"
	date: string; // "2026-11-05"
	dayNumber: number; // 1–25
	title: string;
	location: string; // primary location name
	country: string;
	energyRequired: EnergyLevel;
	contingencies: Contingency[];
	activities: Activity[];
	transports: Transport[];
	accommodation?: Accommodation;
	alerts?: string[];
	notes?: string;
}

export interface Trip {
	id: string;
	name: string;
	startDate: string;
	endDate: string;
	travelers: string[];
	days: TripDay[];
}

// Day context handed to the AI Guide chat (worker/index.js builds the system prompt from this)
export interface AIGuideDayContext {
	date: string;
	city: string;
	country: string;
	dayNumber: number;
	activities: Activity[];
	transport: Transport[];
	accommodation?: Accommodation;
	plans: Contingency[];
}

// Persisted user state (localStorage)
export interface DayState {
	dayId: string;
	schemaVersion: number;
	wakeFeeling?: WakeFeeling;
	activeContingency?: ContingencyLevel;
	checklist: Record<string, boolean>; // activityId → done
	diary?: string;
	costActual?: Money;
	updatedAt: string; // ISO
}
