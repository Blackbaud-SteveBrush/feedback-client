var path = require('path');

module.exports = {
  entry: './index.ts',
  output: {
    path: path.resolve(__dirname, '..', '..', 'dist', 'bundles'),
    filename: 'feedback-client.umd.js',
    library: 'BBFeedbackClient',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            declaration: false
          }
        }
      }
    ]
  }
};
