import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      includeAssets: ['trio-32.svg', 'trio-512.svg'],
      manifest: {
        name: 'Trio',
        short_name: 'Trio',
        description: 'Matching tile game',
        theme_color: '#242424',
        orientation: 'portrait-primary',
        icons: [
          {
            src: 'trio-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': './src'
    }
  }
});
