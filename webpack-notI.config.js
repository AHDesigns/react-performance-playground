module.exports = {
  entry: './notI/app.js',
  output: {
    path: `${__dirname}`,
    filename: 'notI.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$|.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: [ 'es2015', 'react', 'stage-2' ] }
      }
    ]
  }
};
