import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'markedExtendedLists',
      file: 'dist/index.umd.js',
      format: 'umd',
    },
    plugins: [nodeResolve()],
  },
  {
    input: 'src/index.js',
    output: {
      file: 'dist/index.cjs',
      format: 'cjs',
    },
    plugins: [nodeResolve()],
  },
];
