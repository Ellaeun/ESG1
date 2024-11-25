/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F5F5F5",
        secondary: "#DBDBDB",
        tertiary: "#565656",
        highlight: "#134713",
        component: "#F5F5F550",
        "highlight-light": "#1b651b",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans"],
        "helvetica-compressed": ["Helvetica Compressed", "sans"],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".q-w-5-12": {
          "@apply 2xl:w-5/12 lg:w-7/12 md:w-9/12": {},
        },
        ".q-w-6": {
          "@apply 2xl:w-6 lg:w-5 w-4": {},
        },
        ".q-h-16": {
          "@apply 2xl:h-16 lg:h-14 h-12": {},
        },
        ".q-h-14": {
          "@apply 2xl:h-14 lg:h-12 h-10": {},
        },
        ".q-gap-20": {
          "@apply 2xl:gap-20 lg:gap-16 gap-14": {},
        },
        ".q-gap-12": {
          "@apply 2xl:gap-12 lg:gap-10 gap-8": {},
        },
        ".q-gap-5": {
          "@apply 2xl:gap-5 lg:gap-4 gap-3": {},
        },
        ".q-mb-10": {
          "@apply 2xl:mb-10 lg:mb-8 mb-6": {},
        },
        ".q-mb-6": {
          "@apply 2xl:mb-6 lg:mb-4 mb-2": {},
        },
        ".q-text-4xl": {
          "@apply 2xl:text-4xl lg:text-3xl text-2xl": {},
        },
        ".q-text-2xl": {
          "@apply 2xl:text-2xl lg:text-xl text-lg": {},
        },
        ".q-text-lg": {
          "@apply 2xl:text-lg lg:text-base text-sm": {},
        },
        ".q-text-base": {
          "@apply 2xl:text-base lg:text-sm text-xs": {},
        },
        ".q-text-sm": {
          "@apply 2xl:text-sm lg:text-xs text-xs": {},
        },
        ".q-leading-8": {
          "@apply 2xl:leading-8 lg:leading-none leading-none": {},
        },
        ".q-rounded-xl": {
          "@apply 2xl:rounded-xl lg:rounded-lg rounded-lg": {},
        },
        ".q-rounded-l-xl": {
          "@apply 2xl:rounded-l-xl lg:rounded-l-lg rounded-l-lg": {},
        },
        ".q-rounded-r-xl": {
          "@apply 2xl:rounded-r-xl lg:rounded-r-lg rounded-r-lg": {},
        },
      });
    },
  ],
};
