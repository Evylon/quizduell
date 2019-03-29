const _ = require('lodash')
const baseConfig = require('./webpack/webpack.base.config')

const prodConfig = {
  mode: 'production'
}

const imageModuleRule = {
  test: /\.(png|jpg|gif|svg)$/,
  loader: 'file-loader',
  options: {
    // Hash needs to be part of the main name
    // Otherwise image 404s
    // https://forum.vuejs.org/t/prod-build-image-renaming/20630/11
    // Slash at the beginning because otherwise route is
    // /root/dist${filename} -> need /root/dist/${filename}
    name: '/[name]-[hash].[ext]'
  }
}

const config = _.merge({}, prodConfig, baseConfig)
config.module.rules.push(imageModuleRule)

module.exports = config
