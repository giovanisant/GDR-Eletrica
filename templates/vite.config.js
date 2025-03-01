import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy para redirecionar as requisições para o backend Flask
      '/api': 'http://127.0.0.1:5000',  // Caminho para o servidor Flask
    },
  },
})
