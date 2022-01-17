import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'root-entry-name': 'default'
        }
      },
    },
  },
  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
    ],
  },
})
