const config = {
  previewUrl: '',
  filesToWatch: ['dist/**'],
  serveStatic: ['dist', 'dist/css', 'dist/js', 'dist/images'],
  rewriteRules: [
    {
      match: /(http(s):\/\/|\/\/)(.*).hubspot(.*)main.min.css/g,
      replace: 'main.css',
    },
    {
      match: /(http(s):\/\/|\/\/)(.*).hubspot(.*)main.min.js/g,
      replace: 'main.js',
    },
  ],
};

module.exports = config;
