import { defineConfig } from "vite";
import { hono } from "core/vite";
import adapter from "adapter-vercel";
import path from "node:path";

export default defineConfig({
  plugins: [
    hono({ adapter: adapter(), paths: { assets: "http://bucket.com" } }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
