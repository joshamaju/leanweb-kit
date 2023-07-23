import { defineConfig } from "vite";
import { hono } from "core/vite";

export default defineConfig({ plugins: [hono()] });
