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
