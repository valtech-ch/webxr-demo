import { resolve } from "node:path";
import { defineConfig, mergeConfig, UserConfigExport } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";
import glob from "glob";

const EXPOSE_TO_LOCAL_NETWORK = true;

const baseConfig: UserConfigExport = {
  root: resolve(__dirname, "src"),
  build: {
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      input: glob.sync(resolve(__dirname, "src", "**", "*.html")),
    },
  },
  server: {
    port: 1234,
  },
  plugins: [react()],
};

const exposeToLocalNetworkConfig: UserConfigExport = {
  plugins: [basicSsl()],
  server: {
    https: true,
    host: "0.0.0.0",
  },
};

export default defineConfig(EXPOSE_TO_LOCAL_NETWORK ? mergeConfig(baseConfig, exposeToLocalNetworkConfig) : baseConfig);
