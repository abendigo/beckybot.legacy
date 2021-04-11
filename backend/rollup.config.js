import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';

export default {
  input: 'src/backend.js',
  output: {
    file: 'bundle.js',
    format: 'es'
  },
  plugins: [ resolve(), commonjs(), json() ],
  external: ['knex', 'redis']
}
