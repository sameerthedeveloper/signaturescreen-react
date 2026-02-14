import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/signaturescreen-react/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'CF Quotation Builder',
        short_name: 'CF Quotation Builder',
        description: 'A web application for creating and managing quotations.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/signaturescreen-react/',
        start_url: '/signaturescreen-react/',
        orientation: 'portrait',
        icons: [
          {
            src: '/icons/icon-1.jpg',
            sizes: '192x192',
            type: 'image/jpeg'
          },
          {
            src: '/icons/icon-2.jpg',
            sizes: '512x512',
            type: 'image/jpeg'
          }
        ]
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          firebase: ['firebase/app', 'firebase/firestore', 'firebase/auth'],
          ui: ['lucide-react', 'clsx', 'html2pdf.js']
        }
      }
    }
  }
})
