import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://knh1mis5snye.share.zrok.io/',
        changeOrigin: true,
        secure: false, // Ignorar problemas de SSL, se aplicável
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove o prefixo "/api"
      },
    },
  },
});
