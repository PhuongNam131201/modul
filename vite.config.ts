import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Babel fast-refresh only in dev; production uses SWC
      babel: {
        plugins: [],
      },
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    port: 3000,
    open: true,
    // Reduce HMR overlay noise
    hmr: {
      overlay: true,
    },
  },

  build: {
    // Target modern browsers — smaller, faster output
    target: 'es2020',

    // Inline assets < 4KB as base64 to save requests
    assetsInlineLimit: 4096,

    // Enable CSS code splitting
    cssCodeSplit: true,

    // Source maps only in CI / staging (set via env)
    sourcemap: false,

    rollupOptions: {
      output: {
        /**
         * Manual chunk splitting strategy:
         * - vendor-react  → React + Router (stable, cached long-term)
         * - vendor-firebase → Firebase SDK (stable, cached long-term)
         * - App pages are already split by React.lazy()
         */
        manualChunks: {
          'vendor-react':    ['react', 'react-dom', 'react-router-dom'],
          'vendor-firebase': ['firebase/app', 'firebase/auth', 'firebase/database'],
          'vendor-ui':       ['lucide-react', 'clsx', 'tailwind-merge', 'class-variance-authority', 'zustand'],
        },
      },
    },
  },

  // Pre-bundle these for faster cold-start in dev
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'firebase/app',
      'firebase/auth',
      'firebase/database',
      'zustand',
      'lucide-react',
      'clsx',
      'tailwind-merge',
    ],
  },
});
