var path = require('path');

module.exports = {
  mode: 'none',
  entry: path.join(__dirname, 'js-modules', 'scripts.js'),
  output: {
    path: path.resolve(__dirname, 'src/js'),
    filename: 'scripts.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        type: 'javascript/auto',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
