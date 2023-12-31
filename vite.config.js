/* eslint-env node */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'path';
import { createTrioSocketServer } from './server/game.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'trio',
      configureServer(server) {
        if (server.config.mode !== 'test') {
          createTrioSocketServer(server.httpServer);
        }
      }
    },
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
        theme_color: '#333333',
        orientation: 'any',
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
      '@': resolve(__dirname, './src'),
      '@game': resolve(__dirname, './game')
    }
  }
});
