import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import pkg from "./package.json";

export default {
  input: "src/main.ts",
  output: {
    file: pkg.browser,
    format: "es",
  },
  plugins: [nodeResolve(), commonjs(), typescript()],
};
