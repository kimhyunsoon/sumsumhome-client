import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	kit: {
		adapter: adapter({
      pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false,
			strict: true
    }),
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
