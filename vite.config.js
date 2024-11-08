// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',  // Automatically updates service worker
      injectRegister: 'auto',       // Automatically injects service worker registration
      devOptions: {
        enabled: true,              // Enable PWA service worker in development
      },
      manifest: {
        name: 'Sarkari Exam Result',
        short_name: 'MyPWA',
        description: 'My awesome Progressive Web App!',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: './assets/logo.jpg',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './assets/logo.jpg',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
