const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    //生成html
    new htmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ExtractTextWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     'css-loader'
      //   ]
      // }, {
      //   test: /\.less$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     {
      //       loader: 'postcss-loader',
      //       options: {
      //         sourceMap: true
      //       }
      //     },
      //     'less-loader'
      //   ]
      // },
      {
        test: /\.(jpg|jpeg|svg|gif|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name]-aaa.[ext]'
            }
          }
        ]
      }

    ]
  }
}

if (isDev) {
  config.module.rules.push(
    {
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'less-loader'
      ]
    },
  )
  config.devtool = '#cheap-module-eval-source-map'
  //开发环境本地启动一个服务
  config.devServer = {
    port: 8024,
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    //组件更新，不需要刷新页面，需要HotModuleReplacementPlugin
    hot: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  config.module.rules.push(
    {
      test: /\.less$/,
      use: ExtractTextWebpackPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'less-loader'
        ]
      })
    }
  )
  config.plugins.push(
    new ExtractTextWebpackPlugin('styles.[contentHash:8].css')
  )
  config.output.filename = '[name].[chunkHash:8].js'

}
module.exports = config