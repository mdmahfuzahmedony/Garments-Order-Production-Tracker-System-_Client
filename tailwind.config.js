/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    // 👇 এই লাইনটি মিসিং ছিল, তাই ন্যাপবার ভেঙে গেছে
    require("daisyui"), 
  ],
}