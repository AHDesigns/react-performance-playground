module.exports = {
  entry: './immut/app.js',
  output: {
    path: `${__dirname}/immut`,
    filename: 'immut.js'
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
