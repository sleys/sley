global.__CLIENT__ = false
global.__SERVER__ = true
global.__DEVTOOLS__ = true
global.__DEVTOOLS__ = true
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'

const babelConfig = {
  'presets': ['es2015-node5', 'stage-0', 'react'],
  'plugins': [
    'transform-runtime',
    ['transform-async-to-module-method', {
      'module': 'bluebird',
      'method': 'coroutine'
    }],
    'add-module-exports',
    'transform-decorators-legacy'
  ]
}

require('babel-register')(babelConfig)

const hook = require('css-modules-require-hook')

hook({
  devMode: __DEVELOPMENT__,
  extensions: ['.scss'],
  generateScopedName: __DEVELOPMENT__ ? '[name]__[local]___[hash:base64:5]' : '[hash:base64]'
})

if (__DEVELOPMENT__) {
  const options = {
    hook: true,
    ignore: /(\/\.|~$|\.json|\.styl$)/i
  }
  if (!require('piping')(options)) return
}

require('./server')
