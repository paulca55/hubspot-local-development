const config = {
  previewUrl: '',
  filesToWatch: ['dist/**'],
  serveStatic: ['dist', 'dist/css', 'dist/js', 'dist/images'],
  rewriteRules: [
    {
      match: /(https:\/\/|\/\/)(.*).hubspot(.*)style.min.css/g,
      replace: 'style.css',
    },
    {
      match: /(https:\/\/|\/\/)(.*).hubspot(.*)scripts.min.js/g,
      replace: 'scripts.js',
    },
  ],
};

module.exports = config;
