import { defineConfig } from 'vite';
import { minifyHtml } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [minifyHtml()],
  build: {
    assetsInlineLimit: 1,
  },
});
