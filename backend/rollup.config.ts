import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/index.ts",
  output: {
    file: "bundle.js",
    format: "es",
  },
  // resolve must be before typescript
  plugins: [resolve(), typescript(), commonjs()],
  external: ["knex", "redis"],
};
