import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // 👈 এখানে শুধু react() থাকবে, tailwindcss() থাকলে মুছে দিন
})