

const path = require('path');

module.exports = {
  entry: './src/server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.bundle.js'
  },
  target: "node",
    externals: ['pg', 'sqlite3', 'tedious', 'pg-hstore'],
    optimization: {
      // We no not want to minimize our code.
      minimize: false
  },
};