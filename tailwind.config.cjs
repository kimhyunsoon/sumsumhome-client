// import konstaConfig config
import konstaConfig from 'konsta/config';

// wrap config with konstaConfig config
module.exports = konstaConfig({
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class', // or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
});