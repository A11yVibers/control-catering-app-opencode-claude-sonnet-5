import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Using a relative base so the built assets resolve correctly regardless of
// the sub-path the static site is published under (e.g. GitHub Pages
// project/version directories).
export default defineConfig({
  plugins: [react()],
  base: './',
})
