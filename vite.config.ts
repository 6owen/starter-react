import path, { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        '~/': `${resolve(__dirname)}/src/`,
        '@/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    build: {
      chunkSizeWarningLimit: 5000,
    },
    plugins: [react()],
  }
})
