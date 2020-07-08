const config = {
  previewUrl: '',
  filesToWatch: ['./design-tools-files/**'],
  serveStatic: [
    './design-tools-files',
    './design-tools-files/css',
    './design-tools-files/js',
    './design-tools-files/images',
  ],
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
