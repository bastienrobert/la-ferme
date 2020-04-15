import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import ts from '@wessberg/rollup-plugin-ts'
import { eslint } from 'rollup-plugin-eslint'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import graphql from 'rollup-plugin-graphql'
import json from '@rollup/plugin-json'
import sourcemaps from 'rollup-plugin-sourcemaps'

const env = JSON.stringify(
  process.env.NODE_ENV ||
    (process.env.ROLLUP_WATCH ? 'development' : 'production')
)
const watch = process.env.ROLLUP_WATCH

const external = [
  'apollo-server',
  'knex',
  'bookshelf',
  'graphql',
  'graphql-tools',
  'lodash.merge',
  'dotenv',
  'uuid'
]

export default {
  input: ['index.ts'],
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    sourceMap: true
  },
  external,
  plugins: [
    replace({
      'process.env.NODE_ENV': env
    }),
    eslint({
      configFile: './.eslintrc.js'
    }),
    resolve({ preferBuiltins: true }),
    ts(),
    graphql(),
    json(),
    commonjs(),
    !watch && terser(),
    watch && sourcemaps()
  ]
}
