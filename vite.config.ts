import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "projeto-app",
  base: "/projeto/",
  plugins: [react()],
  build: {
    outDir: "../projeto",
    emptyOutDir: true,
    sourcemap: false
  },
  server: {
    port: 5173,
    host: "0.0.0.0"
  }
});
