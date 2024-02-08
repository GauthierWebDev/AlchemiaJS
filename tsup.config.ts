import { defineConfig } from "tsup";

export default defineConfig((options) => {
  const customOptions = options["--" as keyof typeof options] as string[];
  const isProduction = customOptions.includes("production");

  return {
    entry: ["src/index.ts"],
    minify: isProduction,
    name: "server-dev",
    splitting: false,
    sourcemap: true,
    format: ["cjs"],
    outDir: "dist",
    clean: true,
  };
});
