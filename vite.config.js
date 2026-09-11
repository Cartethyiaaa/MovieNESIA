import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    // Smaller, faster-to-parse output for a WebView on a mid-range phone.
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2018',
  },
})
