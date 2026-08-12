// claude: offline detection via HEAD ping (navigator.onLine lies on hotel WiFi)
import { writable } from 'svelte/store';

export const isOffline = writable(false);

if (typeof window !== 'undefined') {
	const check = async () => {
		try {
			await fetch('/', { method: 'HEAD', cache: 'no-store' });
			isOffline.set(false);
		} catch {
			isOffline.set(true);
		}
	};
	check();
	setInterval(check, 15_000);
}
