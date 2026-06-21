import tailwindcss from '@tailwindcss/vite';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: './', // CRITICAL: Makes all compiled assets relative so it works on GitHub Pages and local files!
    plugins: [tailwindcss()],
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
