import { defineConfig } from 'vite';
import { minifyHtml } from 'vite-plugin-html';
import imagemin from 'rollup-plugin-imagemin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [minifyHtml(), imagemin()],
});
