import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa';
import manifest from './public/manifest.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: manifest,
      workbox: {
        globPatterns: ['**/*.{js, css, html, ico, svg, png, jpg, jpeg}']
      },
      devOptions: {
        enabled: false,
    }})
  ],
  server: {
    proxy: {
      "/api":{
        target: "http://localhost:5000",
        changeOrigin: true,
      }
    }
  }
})
