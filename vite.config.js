import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    chunkSizeWarningLimit: 1000,
    rollupOptions:{
      output:{
        manualChunks:{
          react:['react','react-dom']
        },
      }
    }
  },
  resolve:{
    alias:{
      "@": '/src',
    }
  }
})
