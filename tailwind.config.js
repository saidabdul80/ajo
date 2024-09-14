/** @type {import('tailwindcss').Config} */
let arr =[];
for (let index = 0; index < 100; index++) {
  arr.push('tw-h-['+index+'px]');
  arr.push('tw-w-['+index+'px]');
}
export default {
  prefix: 'tw-',
  corePlugins: {
    //preflight: false,
  },
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    ...arr
  ]
}

