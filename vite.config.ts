import { paraglide } from '@inlang/paraglide-sveltekit/vite';
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	server: {
		host: '0.0.0.0'
	},
	plugins: [
		sveltekit(),
		paraglide({
			project: './project.inlang',
			outdir: './src/lib/paraglide'
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
				quietDeps: true,
				silenceDeprecations: ['legacy-js-api'],
			}
		}
	}
});
