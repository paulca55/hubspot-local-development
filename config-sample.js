const config = {
  previewUrl:
    'http://hubspot-developers-14se7vi-6398652.hs-sites.com/?hs_preview=JdkZYGUZ-24554045089',
  filesToWatch: ['dist/**'],
  serveStatic: ['dist', 'dist/css', 'dist/js', 'dist/images'],
  rewriteRules: [
    {
      match: /\/\/(.*).hubspot(.*)style.min.css/g,
      replace: 'style.css',
    },
    {
      match: /\/\/(.*).hubspot(.*)scripts.min.js/g,
      replace: 'scripts.js',
    },
    {
      match: /\/\/(.*).hubspot(.*)image.png/g,
      replace: 'image.png',
    },
  ],
};

module.exports = config;
