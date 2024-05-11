/** @type {import('tailwindcss').Config} */
export default {
  content: [
   "./index.html",
   "./src/**/*.{vue,js,ts}",
   "./formkit.config.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
   require('@tailwindcss/forms'),
  ],
}

