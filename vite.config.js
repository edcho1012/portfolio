import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages project-repo path: https://edcho1012.github.io/portfolio/
  base: '/portfolio/',
});
