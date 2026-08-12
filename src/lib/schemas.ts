// claude: zod schemas mirroring src/lib/types.ts, used for build-time data validation

import { z } from 'zod';

export const energyLevelSchema = z.enum(['high', 'medium', 'low']);
export const wakeFeelingSchema = z.enum(['rested', 'ok', 'rough']);
export const contingencyLevelSchema = z.enum(['A', 'B', 'C', 'D']);
export const activityStatusSchema = z.enum(['confirmed', 'pending', 'optional', 'cancelled']);
export const currencySchema = z.enum(['BRL', 'USD', 'THB', 'VND', 'CNY', 'TRY']);

export const moneySchema = z.object({
	amount: z.number().int(),
	currency: currencySchema
});

export const locationSchema = z.object({
	name: z.string(),
	nameChinese: z.string().optional(),
	lat: z.number().optional(),
	lng: z.number().optional(),
	mapUrl: z.string().optional()
});

export const activitySchema = z.object({
	id: z.string(),
	time: z.string().optional(),
	title: z.string(),
	description: z.string().optional(),
	location: locationSchema.optional(),
	contingency: z.array(contingencyLevelSchema),
	status: activityStatusSchema,
	costEstimate: moneySchema.optional(),
	notes: z.string().optional(),
	droneAllowed: z.boolean().nullable().optional()
});

export const transportSchema = z.object({
	id: z.string(),
	time: z.string(),
	type: z.enum(['flight', 'train', 'bus', 'ferry', 'taxi', 'metro', 'cable-car', 'other']),
	from: z.string(),
	to: z.string(),
	code: z.string().optional(),
	status: z.enum(['paid', 'confirmed', 'pending', 'critical']),
	notes: z.string().optional()
});

export const accommodationSchema = z.object({
	name: z.string(),
	location: z.string(),
	checkIn: z.string().optional(),
	checkOut: z.string().optional(),
	status: z.enum(['paid', 'reserved', 'pending']),
	notes: z.string().optional()
});

export const contingencySchema = z.object({
	level: contingencyLevelSchema,
	label: z.string(),
	description: z.string()
});

export const tripDaySchema = z
	.object({
		id: z.string(),
		date: z.string(),
		dayNumber: z.number().int().min(1).max(25),
		title: z.string(),
		location: z.string(),
		country: z.string(),
		energyRequired: energyLevelSchema,
		contingencies: z.array(contingencySchema),
		activities: z.array(activitySchema),
		transports: z.array(transportSchema),
		accommodation: accommodationSchema.optional(),
		alerts: z.array(z.string()).optional(),
		notes: z.string().optional()
	})
	.superRefine((day, ctx) => {
		if (day.energyRequired === 'high') {
			const levels = new Set(day.contingencies.map((c) => c.level));
			if (!levels.has('A') || !levels.has('B')) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `high-energy day "${day.id}" must define at least contingencies A and B`
				});
			}
		}
	});

export const tripSchema = z.object({
	id: z.string(),
	name: z.string(),
	startDate: z.string(),
	endDate: z.string(),
	travelers: z.array(z.string()),
	days: z.array(tripDaySchema)
});
