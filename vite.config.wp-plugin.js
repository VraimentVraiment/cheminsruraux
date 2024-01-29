import commonConfig from './vite.config.common';

export default commonConfig({
  entryPath: 'scripts/wp-plugin.js',
  distPath: 'wp-plugin/dist',
});
