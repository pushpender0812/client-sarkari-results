import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',  // Check for updates automatically
      injectRegister: 'auto',       // Auto-inject service worker registration
      manifest: {
        name: 'Sarkar Exam Results',
        short_name: 'MyPWA',
        start_url: '/',
        display: 'standalone',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          {
            src: '/assets/logo.jpg', // Update to absolute path
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/assets/logo.jpg', // Update to absolute path
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
