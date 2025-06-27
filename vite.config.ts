import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,        // 👈 Cho phép truy cập từ bên ngoài container
    port: 5173         // 👈 Trùng với port bạn đang expose trong Docker
  }
}) 