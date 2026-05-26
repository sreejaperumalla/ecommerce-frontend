import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      'freehand-perkiness-garage.ngrok-free.dev'
    ],
    proxy: {
      '/user/login': 'https://e-commerce-production-68a9.up.railway.app',
      '/admin/login': 'https://e-commerce-production-68a9.up.railway.app',
      '/profile': 'https://e-commerce-production-68a9.up.railway.app',
      '/auth': 'https://e-commerce-production-68a9.up.railway.app'
    }
  }
})
