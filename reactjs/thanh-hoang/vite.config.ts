import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Configure absolute imports to match the existing baseUrl: "src" setup
      'src': resolve(__dirname, 'src'),
      'API': resolve(__dirname, 'src/API'),
      'components': resolve(__dirname, 'src/components'),
      'configs': resolve(__dirname, 'src/configs'),
      'constants': resolve(__dirname, 'src/constants'),
      'interfaces': resolve(__dirname, 'src/interfaces'),
      'pages': resolve(__dirname, 'src/pages'),
      'routes': resolve(__dirname, 'src/routes'),
      'types': resolve(__dirname, 'src/types'),
    }
  },
  server: {
    port: 3000,
    open: true,
    host: true
  },
  build: {
    outDir: 'build',
    sourcemap: true,
    // Increase chunk size warning limit for educational projects
    chunkSizeWarningLimit: 1000
  },
  // Configure for educational environment with detailed console output
  define: {
    // Preserve console logs in production for educational purposes
    'console.log': 'console.log',
    'console.warn': 'console.warn',
    'console.error': 'console.error'
  }
})
