// claude: build-time validation of data/asia-2026 seed files against the trip day schema
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { tripDaySchema } from '../src/lib/schemas.ts';

const dataDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../data/asia-2026');

const files = readdirSync(dataDir).filter((f) => f.endsWith('.json'));

if (files.length === 0) {
	throw new Error(`no seed files found in ${dataDir}`);
}

let hasError = false;

for (const file of files) {
	const raw = readFileSync(path.join(dataDir, file), 'utf8');
	const json = JSON.parse(raw);
	const result = tripDaySchema.safeParse(json);
	if (!result.success) {
		hasError = true;
		console.error(`✗ ${file}:`);
		for (const issue of result.error.issues) {
			console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
		}
	}
}

if (hasError) {
	throw new Error('data validation failed — see errors above');
}

console.log(`✓ validated ${files.length} day files in ${dataDir}`);
