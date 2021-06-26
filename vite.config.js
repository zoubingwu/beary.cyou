import { defineConfig } from 'vite';
import { minifyHtml } from 'vite-plugin-html';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    minifyHtml(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  build: {
    assetsInlineLimit: 1,
  },
});
