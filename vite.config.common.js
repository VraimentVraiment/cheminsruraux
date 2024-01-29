import path from 'path';
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';

const projectDir = path.dirname(new URL(import.meta.url).pathname);
const srcDir = path.resolve(projectDir, 'src');

export default ({
  entryPath,
  distPath = 'dist',
}) => {
  const outDir = path.resolve(projectDir, distPath);

  return defineConfig({
    root: srcDir,
    build: {
      outDir,
      manifest: true,
      rollupOptions: {
        input: path.resolve(srcDir, entryPath),
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('./node_modules', import.meta.url)),
      },
    },
    plugins: [
      stylelint(),
      {
        apply: 'build',
        ...eslint(),
      },
      {
        apply: 'serve',
        ...eslint({
          failOnWarning: false,
          failOnError: false,
        }),
        enforce: 'post',
      },
    ],
  });
};
