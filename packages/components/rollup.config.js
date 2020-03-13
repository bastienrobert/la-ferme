import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import ts from '@wessberg/rollup-plugin-ts'
import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import filesize from 'rollup-plugin-filesize'

import pkg from './package.json'
import pkg_native from './native/package.json'
import tsconfig from './tsconfig.json'

function resolveEntries() {
  return Object.entries(
    tsconfig.compilerOptions.paths
  ).map(([find, [replacement]]) => ({ find, replacement }))
}

function generateConfig(input, output) {
  return {
    input: input,
    output: [{ file: output, format: 'cjs' }],
    plugins: [
      external(),
      ts(),
      alias({
        resolve: ['.ts', '.tsx'],
        entries: resolveEntries()
      }),
      resolve(),
      commonjs({
        include: ['node_modules/**']
      }),
      filesize()
    ]
  }
}

export default [
  generateConfig('src/index.ts', pkg.main),
  generateConfig('src/index.native.ts', './native/' + pkg_native.main)
]
