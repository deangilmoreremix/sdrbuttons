import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Fix Node.js timer compatibility issues in WebContainer
    'process.env': {},
    'global': 'globalThis',
  },
  optimizeDeps: {
    exclude: ['fsevents'],
    include: [
      'react',
      'react-dom',
      '@supabase/supabase-js'
    ]
  },
  server: {
    port: 5173,
    host: true,
    fs: {
      strict: false
    }
  },
  build: {
    target: 'esnext',
    minify: false,
    sourcemap: true
  }
})