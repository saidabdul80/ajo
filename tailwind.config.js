/** @type {import('tailwindcss').Config} */
let arr = [];
for (let index = 0; index < 100; index++) {
  arr.push("tw-h-[" + index + "px]");
  arr.push("tw-w-[" + index + "px]");
}
export default {
  prefix: "tw-",
  corePlugins: {
    //preflight: false,
  },
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    ...arr,
    "tw-grid",
    "tw-grid-cols-7",
    "tw-col-span-4",
    "tw-px-8",
    "tw-block",
    "tw-hidden",
  ],
};
