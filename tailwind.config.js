/** @type {import('tailwindcss').Config} */
export default {
  content: [
   "./index.html",
   "./src/**/*.{vue,js,ts}",
   "./formkit.config.js",
   "./node_modules/vue-tailwind-datepicker/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
   require('@tailwindcss/forms'),
  ],
}

