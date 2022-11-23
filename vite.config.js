import { resolve } from "node:path";
import { defineConfig } from "vite";
// import basicSsl from "@vitejs/plugin-basic-ssl";
import glob from "glob";

export default defineConfig({
  root: resolve(__dirname, "src"),
  build: {
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      input: glob.sync(resolve(__dirname, "src", "**", "*.html")),
    },
  },
  // plugins: [basicSsl()],
  server: {
    port: 1234,
    // https: true,
    // host: "0.0.0.0",
  },
});
