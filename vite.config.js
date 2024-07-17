import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import legacy from '@vitejs/plugin-legacy';
import windicss from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    windicss(),
    createHtmlPlugin({
      minify: true,
      entry: './src/main.js',
      template: './index.html',
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
});
