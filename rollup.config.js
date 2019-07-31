import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";
import postcss from 'rollup-plugin-postcss'

export default [
  {
    input: "src/index.tsx",
    external: Object.keys(pkg.peerDependencies || {}),
    plugins: [
      postcss({
        plugins: []
      }),
      typescript({
        typescript: require("typescript")
      })
    ],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" }
    ]
  }
];
