import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import environment from 'vite-plugin-environment';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

export default defineConfig({
  base: '/',
  build: {
    rollupOptions:{
      external: ['react-query'],
    },
    assetsDir: 'assets',
    emptyOutDir: true,
    outdir: 'dist',
    sourcemap: false,
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      include: ['@chakra-ui/react'],
    },
  },
  server: {
    cache: false,
    open: true,
    cors: true,
    watch:{
      usePolling: true,
    },
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
  ],
  resolve: {
    alias: [
      {
        find: 'declarations',
        replacement: fileURLToPath(new URL('../declarations', import.meta.url)),
      },
      {
        find: 'react-query',
        replacement: '@tanstack/react-query',
      },
      {
        find: '@',
        replacement: fileURLToPath(new URL('../../src', import.meta.url)),
      },
    ],
  },
});