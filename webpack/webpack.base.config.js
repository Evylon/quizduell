const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const path = require('path')
const outputPath = path.resolve(__dirname, '..', 'dist')

module.exports = {
  entry: {
    main: './public/app.ts',
  },
  plugins: [
    // Gives dist clean slate on each run
    // https://github.com/johnagan/clean-webpack-plugin
    new CleanWebpackPlugin(['dist']),
    // Enables us to use a custom base html file
    // https://github.com/jantimon/html-webpack-plugin
    new HtmlWebpackPlugin({
      title: 'quizduell-ui',
      template: './public/base.html',
      filename: 'index.html',
      // favicon: 'logo.png',
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin({
      outputPath
    }),
    new VueLoaderPlugin()
  ],
  output: {
    filename: '[name].js',
    path: outputPath,
    publicPath: outputPath
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        node_vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 1
        }
      }
    }
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          // https://github.com/Microsoft/TypeScript-Vue-Starter
          // sass-loader has to be loaded this way as described in the above
          'scss': 'vue-style-loader!css-loader!sass-loader',
          'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
        }
      }
    }, {
      test: /\.(sass|scss)$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
    }, {
      test: /\.tsx?$/,
      loader: 'ts-loader',
      options: {
        appendTsSuffixTo: [/\.vue$/],
        configFile: 'tsconfig.webpack.json'
      }
    }]
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      // Need a runtime version for live
      // https://github.com/vuejs/vue-router/issues/713
      vue$: 'vue/dist/vue.esm.js'
    }
  }
}
