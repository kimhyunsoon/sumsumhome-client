import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

const config = {
	kit: {
		adapter: adapter(),
	},
	preprocess: vitePreprocess(),
  onwarn: (warning, handler) => {
    if (
      warning.code === 'a11y-click-events-have-key-events'
      || warning.code === 'a11y-no-static-element-interactions'
    ) return
    handler(warning)
  },
};

export default config;
