import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Pages({
      dirs: 'src/pages',
      extensions: ['tsx'],
      exclude: ['**/components/**', '**/*.test.*'],
      routeStyle: 'next',
      extendRoute(route) {
        return {
          ...route,
          caseSensitive: false,
        }
      },
    }),
    AutoImport({
      imports: [
        'react',
        'react-router-dom',
        {
          'react-use': ['useToggle'],
        },
      ],
      dirs: ['./src/composables'],
      dirsScanOptions: {
        types: true,
      },
      dts: './src/typings/auto-imports.d.ts',
      dtsMode: 'overwrite',
      viteOptimizeDeps: true,
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
