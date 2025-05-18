import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/daycarereborn/', // Replace with your repository name
  build: {
    sourcemap: true,
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignore all warnings
        return;
      }
    }
  }
})
