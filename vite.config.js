import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    'process.env': {}
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  esbuild: {
    loader: "jsx", // OR "jsx"
    include: [
      // Add this for business-as-usual behaviour for .jsx and .tsx files
      "src/**/*.jsx",
      "src/**/*.tsx",
      "node_modules/**/*.jsx",
      "node_modules/**/*.tsx",

      // Add the specific files you want to allow JSX syntax in
      "src/LocalJsxInJsComponent.js",
      "node_modules/bad-jsx-in-js-component/index.js",
      "node_modules/bad-jsx-in-js-component/js/BadJSXinJS.js",
      "node_modules/bad-jsx-in-js-component/ts/index.ts",
      "node_modules/bad-jsx-in-js-component/ts/BadTSXinTS.ts",

      // --- OR ---

      // Add these lines to allow all .js files to contain JSX
      "src/**/*.js",
      "node_modules/**/*.js",

      // Add these lines to allow all .ts files to contain JSX
      "src/**/*.ts",
      "node_modules/**/*.ts",
    ],
  },
})  