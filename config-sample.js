const config = {
  previewUrl:
    'http://hubspot-developers-14se7vi-6398652.hs-sites.com/?hs_preview=JdkZYGUZ-24554045089',
  filesToWatch: ['dist/**'],
  serveStatic: ['dist', 'dist/css', 'dist/js', 'dist/images'],
  rewriteRules: [
    {
      match: /(https?:\/\/|\/\/).*hubspot.+main.min.css/g,
      replace: 'main.css',
    },
    {
      match: /(https?:\/\/|\/\/).*hubspot.+main.min.js/g,
      replace: 'main.js',
    },
    {
      match: /(https?:\/\/|\/\/).*hubspot.+image.png/g,
      replace: 'image.png',
    },
  ],
};

module.exports = config;
