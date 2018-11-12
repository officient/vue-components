const webpack = require('webpack')
const merge = require('webpack-merge')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const { baseConfig, setupHTMLWebpack } = require('./webpack.utils')
const serverConfig = require('./server-config.json')
const path = require('path')

// keep up to date with core

const lang = process.env.DEV_BUILD_LANG || 'en'

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: 8085,
    disableHostCheck: true,
    historyApiFallback: true,
    overlay: true,
    contentBase: path.join(__dirname, '../html'),

    // CSP Headers, slighty less strict than prod
    // * local websockets (HMR / Load)
    // * style-src nonce (set via loader config) (hot loaded styles are injected)
    headers: {
      'Content-Security-Policy': '' +
        "default-src "    + `${serverConfig.csp.defaultSrc.join(' ')}; `     +
        "script-src "     + `${serverConfig.csp.scriptSrc.join(' ')}; `      +
        "connect-src "    + `${serverConfig.csp.connectSrc.join(' ')} ws://localhost:8085; ` +
        "style-src "      + `${serverConfig.csp.styleSrc.join(' ')}; ` +
        "font-src "	      + `${serverConfig.csp.fontSrc.join(' ')}; `        +
        "img-src "	      + `${serverConfig.csp.imgSrc.join(' ')}; `         +
        "child-src "      + `${serverConfig.csp.childSrc.join(' ')}; `       +
        "frame-src "      + `${serverConfig.csp.frameSrc.join(' ')}; `       +
        "frame-ancestors " + `${serverConfig.csp.frameAncestors.join(' ')}; ` +
        "object-src "     + `${serverConfig.csp.objectSrc.join(' ')};`
    },

    proxy: [{
      context: [
        '/api',
      ],
      onError: () => { /* don't crash webpack on errors */ },
      target: 'http://test.local.officient.io',
    }],
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new HardSourceWebpackPlugin(),
    setupHTMLWebpack(`html/index.html`),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        // javascript client-side code must be able to refer to language via process.env.LANGUAGE
        'LANGUAGE': JSON.stringify(lang),
      }
    }),
  ],
  devtool: 'cheap-source-map'
})
