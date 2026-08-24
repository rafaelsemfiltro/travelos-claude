import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// claude: set base path so GitHub Pages subdirectory deploy resolves assets correctly
/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false,
			strict: false
		}),
		paths: {
			base: process.argv.includes('dev') ? '' : '/travelos-claude'
		},
		prerender: {
			// #emergency is a placeholder anchor for the static emergency sheet (MVP-0)
			handleMissingId: 'ignore'
		}
	}
};

export default config;
