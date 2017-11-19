var FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const path = require('path');

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve('dist'),
        filename: "bundle.js",
        libraryTarget: 'umd',
        library: '_spark'
    },
    watch: true,
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
        ]
    },
    plugins: [
        // new FlowBabelWebpackPlugin(),
        new BrowserSyncPlugin({
          // browse to http://localhost:3000/ during development, 
          // ./public directory is being served 
          host: 'localhost',
          port: 3000,
          files: ['./*.php'],
          proxy:'http://localhost/'
        })
      ]
}