import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed to GitHub Pages under a version-named subpath (see .github workflow),
// so we use a relative base and hash-based routing to keep all asset URLs relative.
export default defineConfig({
  base: './',
  plugins: [react()],
})
