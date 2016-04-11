const path = require('path')
const webpack = require('webpack')

const port = 4001
const host = 'localhost'

const projectPath = path.resolve(__dirname, '../')
const assestPath = path.resolve(projectPath, './static/dist')

module.exports = {
  devtool: 'inline-source-map',
  target: 'web',
  debug: true,
  progress: true,
  errorDetails: true,
  context: path.resolve(__dirname, '..'),
  entry: {
    app: [
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
      './client/app.js'
    ]
  },
  output: {
    path: assestPath,
    filename: 'js/bundle.js',
    publicPath: 'http://' + host + ':' + port + '/dist/',
    chunkFilename: '[id].bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      },
      __CLIENT__: true,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true
    })
  ],
  resolve: {
    alias: {
      'react': 'react-lite',
      'react-dom': 'react-lite'
    },
    modulesDirectories: [
      'shared',
      'node_modules'
    ],
    extensions: ['', '.js', '.json']
  },
  postcss: [
    require('autoprefixer'),
    require('postcss-import'),
    require('postcss-color-rebeccapurple'),
    require('cssnext')
    // require('cssnano')
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['react-hmre']
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss']
      },
      {
        test: /main\.scss/,
        loaders: ['style', 'css', 'postcss', 'sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules|main.scss/,
        loaders: ['style', 'css?modules&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss', 'sass?outputStyle=expanded&sourceMap']
      },
      { test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  }
}
