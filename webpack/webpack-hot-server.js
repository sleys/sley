const Koa = require('koa')
const webpack = require('webpack')
const convert = require('koa-convert')
const devMiddleware = require('koa-webpack-dev-middleware')
const hotMiddleware = require('koa-webpack-hot-middleware')
const webpackConfig = require('./webpack.dev.config')
const compiler = webpack(webpackConfig)

const host = 'localhost'
const port = 4001

const options = {
  contentBase: 'http://' + host + ':' + port,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  stats: {
    colors: true
  }
}

const server = new Koa()

server.use(convert(devMiddleware(compiler, options)))
server.use(convert(hotMiddleware(compiler)))

server.listen(port, 'localhost', function (err) {
  if (err) {
    console.log(err)
  }
  console.log('webpack hot server listen ' + port)
})
