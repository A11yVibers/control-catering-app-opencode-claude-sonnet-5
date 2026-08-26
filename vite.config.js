import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Using a relative base so the built assets resolve correctly when the
// site is published under a version sub-path on GitHub Pages
// (e.g. https://<user>.github.io/<repo>/<version>/).
export default defineConfig({
  base: './',
  plugins: [react()],
})
