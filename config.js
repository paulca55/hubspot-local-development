const config = {
  previewUrl: '',
  filesToWatch: ['./dist/**'],
  serveStatic: ['./dist', './dist/css', './dist/js', './dist/images'],
  rewriteRules: [
    {
      match: /(https?:\/\/|\/\/).*\/hub_generated\/.+styles.min.css/g,
      replace: 'styles.css',
    },
    {
      match: /(https?:\/\/|\/\/).*\/hub_generated\/.+scripts.min.js/g,
      replace: 'scripts.js',
    },
  ],
};

module.exports = config;
