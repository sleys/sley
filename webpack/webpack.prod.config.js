const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')
const strip = require('strip-loader')

const projectPath = path.resolve(__dirname, '../')
const assestPath = path.resolve(projectPath, './static/dist')

module.exports = {
  devtool: 'source-map',
  target: 'web',
  progress: true,
  debug: false,
  context: path.resolve(__dirname, '..'),
  entry: {
    app: [
      'babel-polyfill',
      './client/app.js'
    ]
  },
  output: {
    path: assestPath,
    filename: 'js/[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].chunk.js',
    publicPath: '/dist/' // or your host
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        // Useful to reduce the size of client-side libraries, e.g. react
        NODE_ENV: JSON.stringify('production')
      },
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),
    new AssetsPlugin({filename: 'assets.json', path: assestPath}),
    new ExtractTextPlugin('css/[name]-[chunkhash].css', {
      allChunks: true
    }),
    new CleanPlugin([assestPath], {
      'root': projectPath
    })
  ],
  resolve: {
    modulesDirectories: [
      'shared',
      'node_modules'
    ],
    extensions: ['', '.json', '.js']
  },
  postcss: [
    require('autoprefixer'),
    require('postcss-import'),
    require('postcss-color-rebeccapurple'),
    require('cssnext') // ,
    // require('cssnano')
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [strip.loader('debug'), 'babel']
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss')
      },
      {
        test: /main\.scss/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
      },
      {
        test: /\.scss$/,
        exclude: /node_modules|main.scss/,
        loader: ExtractTextPlugin.extract('style', 'css?modules!postcss!sass')
      },
      { test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  }
}
