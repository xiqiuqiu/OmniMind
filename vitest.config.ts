/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/__tests__/**/*.test.ts"],
    exclude: ["node_modules", "dist"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
