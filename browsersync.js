var config = require('./config.js');
var browserSync = require('browser-sync');

browserSync({
  proxy: config.previewUrl,
  files: config.filesToWatch,
  serveStatic: config.serveStatic,
  rewriteRules: config.rewriteRules,
});
