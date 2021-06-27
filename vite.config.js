import { defineConfig } from 'vite';
import { minifyHtml } from 'vite-plugin-html';
import legacy from '@vitejs/plugin-legacy';
import windicss from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    windicss(),
    minifyHtml(),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
});
