import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";
import autoprefixer from 'autoprefixer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), flowbiteReact()],
  server: {
    host: true,  // 👈 esto hace que Vite escuche en 0.0.0.0
    port: 5170,
  },
  css: {
    postcss: {
      plugins: [autoprefixer()]
    }
  }
});