import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Plain static SPA build — no SSR, no server runtime required.
// Output is a fully static dist/ folder deployable to Vercel, Cloudflare
// Pages, GitHub Pages, Netlify, or any static host with zero extra config.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
  },
});
