import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'
import sourcemaps from 'rollup-plugin-sourcemaps'

const production = !process.env.ROLLUP_WATCH

export default {
  input: ['src/index.ts'],
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    sourceMap: true
  },
  external: ['express', 'body-parser', 'dotenv', 'uuid'],
  plugins: [
    resolve({ extensions: ['.ts'] }),
    typescript({
      useTsconfigDeclarationDir: true,
      objectHashIgnoreUnknownHack: true,
      clean: true
    }),
    commonjs(),
    production && terser(),
    json(),
    !production && sourcemaps()
  ]
}
