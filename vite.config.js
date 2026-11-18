// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      // Tudo o que começar com /api é redirecionado para o servidor Express na porta 3000
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // O rewrite remove o "/api" antes de enviar para o Express (ou seja, /api/doadores vira /doadores)
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})