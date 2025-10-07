import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [react()],
    publicDir: mode === "development" ? "public" : "public", // keep public folder for both modes
    build: {
      minify: true,
      sourcemap: true,
      cssMinify: true,
      outDir: "dist", // default, but explicit
      rollupOptions: {
        // You can keep these if you want to control chunking or external packages
      },
    },
  };
});
