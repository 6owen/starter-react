import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tanstackStart({
      srcDirectory: 'src',
      router: {
        generatedRouteTree: './routeTree.gen.ts',
        routeFileIgnorePrefix: '-',
        routesDirectory: './pages',
      },
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
