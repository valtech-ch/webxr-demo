import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  root: resolve(__dirname, "src"),
  build: {
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        "3d": resolve(__dirname, "src/3d/index.html"),
        vr: resolve(__dirname, "src/vr/index.html"),
        ar: resolve(__dirname, "src/ar/index.html"),
        "hit-testing": resolve(__dirname, "src/hit-testing/index.html"),
      },
    },
  },
});
