const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin  = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const crypto = require('crypto')
const languages = require('./languages')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// keep up to date with core

const postCSSLoader = {
  loader: 'postcss-loader',
  options: {
    config: {
      path: path.join(__dirname, 'postcss.config.js')
    }
  }
}

const setupHTMLWebpack = (filename) => {
  return new HtmlWebpackPlugin({
    filename: `../${filename}`,
    template: path.resolve(__dirname, '..', 'index.html'),
    inject: true,
    cache: false,
    minify: {
      collapseWhitespace: true,
      preserveLineBreaks: true,
      removeComments: true,
    },
  })
}

const baseConfig = {
  entry: [
    path.resolve(__dirname, '../main.js'),
    path.resolve(__dirname, '../style.scss'),
  ],
  output: {
    path: path.join(__dirname, '../html'),
    chunkFilename: `js/chunks/[name].js?v=[chunkhash]`,
    filename: `js/[name].js?v=[hash]`,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.js$/,
        use: 'babel-loader?cacheDirectory',
        exclude: /node_modules[\/\\](?!(officient-vue-components)[\/\\]).*/
      },
      {
        test: /\.s[a|c]ss$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader', postCSSLoader,  'sass-loader' ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
  },
  plugins: [
    new VueLoaderPlugin(),

    new MiniCssExtractPlugin({ filename: 'css/style.css?v=[contenthash]' }),
    // moment does require('./locale/' + name); where name is "nl" so the final regex has to match this variable (not nl.js for example)
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, new RegExp('(' + languages.join('|') + ')$')),

    // new BundleAnalyzerPlugin({ analyzerPort: 9999 })
  ]
}

const createConfigForLang = (lang) => {
  return {
    output: {
      filename: `js/[name].${lang}.js?v=[hash]`,
    },
    plugins: [
      setupHTMLWebpack(`html/index.${lang}.html`)
    ]
  }
}

const hashedIDPlugins = [

  // every module that is require()'d has an unique hashed ID instead of numerical incremental ID
  // this will make our hash consistent between builds and cause long-term caching as well
  new webpack.HashedModuleIdsPlugin({
    hashFunction: 'sha256',
    hashDigest: 'hex',
    hashDigestLength: 4
  }),

  // the ID of our chunks (not a specific module but entire chunk) when required is incremental: 0, 1, 2, 3, ...
  // this causes errors, here we give it the name of the file
  new webpack.NamedChunksPlugin(function() {
    return function nameResolver(chunk) {
        return chunk.name
    }
  }()),
]

module.exports = {
  baseConfig,
  createConfigForLang,
  setupHTMLWebpack,
  hashedIDPlugins,
}
