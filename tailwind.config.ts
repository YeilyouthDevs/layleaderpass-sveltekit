import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import plugin from 'tailwindcss/plugin';
import type { Config } from 'tailwindcss';

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./.storybook/preview.js'
	],
	darkMode: 'class',
	theme: {
		extend: {}
	},
	plugins: [
		typography,
		forms,
		containerQueries,
		aspectRatio,
		plugin(function ({ addComponents }) {
			addComponents({
				// 'button': {
				// 	outlineColor: '#f00',
				// }
			});
		})
	],
} satisfies Config;
