import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000 // Set the limit to 1000 KB (1MB)
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Define the @ alias to point to src
    },
  },
  server: {
    open: true, // Open the app in the browser automatically
  },
  optimizeDeps: {
    include: ['@shadcn/ui'],
  },
});
