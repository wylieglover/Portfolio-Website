import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listen on all addresses, including external ones
    port: 3000, // Ensure the port matches the one exposed in Dockerfile
    strictPort: true, // Fail if the port is already in use
  },
})
