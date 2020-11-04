const config = {
  previewUrl: '',
  filesToWatch: ['./dist/**'],
  serveStatic: ['./dist', './dist/css', './dist/js', './dist/images'],
  rewriteRules: [
    {
      match: /(https?:\/\/|\/\/).*hubspot.+main.min.css/g,
      replace: 'main.css',
    },
    {
      match: /(https?:\/\/|\/\/).*hubspot.+main.min.js/g,
      replace: 'main.js',
    },
  ],
};

module.exports = config;
