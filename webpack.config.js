const _ = require('lodash')
const baseConfig = require('./webpack/webpack.base.config')

const devConfig = {
  mode: 'development',
  watch: true
}

const imageModuleRule = {
  test: /\.(png|jpg|gif|svg)$/,
  loader: 'file-loader',
  options: {
    // Locally the hash name needs to be an extension
    // As the filenames on the mounted volumes are not hashed
    name: '[name].[ext]?[hash]'
  }
}

const config = _.merge({}, devConfig, baseConfig)
config.module.rules.push(imageModuleRule)

module.exports = config
