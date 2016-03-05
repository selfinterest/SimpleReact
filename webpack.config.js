const utils = require("./build-cfg/utils")
    , srcPath = utils.srcPath
    , distPath = utils.distPath
    , TARGET = process.env.npm_lifecycle_event  //what manner of sorcery is this!?
    , merge = require("webpack-merge")
    , webpack = require("webpack")
    , NpmInstallPlugin = require("npm-install-webpack-plugin")
    , HtmlWebpackPlugin = require("html-webpack-plugin")
;

console.log(srcPath());
console.log(distPath());

const common = {
    entry: {
        app: srcPath()      //this, plus the resolve entry below, will load index.jsx as the app entry point
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: distPath(),
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel?cacheDirectory'],
                include: srcPath()
            }
        ]
    }
}


if(TARGET === 'start' || !TARGET) {
    module.exports = merge.smart(common, {
        entry: [
            'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
            'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
            srcPath()      //this, plus the resolve entry below, will load index.jsx as the app entry point
        ],
        module: {           //this works because webpack merge is careful to concatenate loaders instead of replacing them
          loaders: [
              {
                  test: /\.jsx?$/,
                  loaders: ['react-hot'],
                  include: srcPath()
              }
          ]
        },
        devtool: 'eval-source-map',
        devServer: {
            contentBase: distPath(),
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            stats: 'errors-only',

            host: process.env.HOST,
            port: process.env.PORT
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new NpmInstallPlugin({
                save: true
            }),
            new HtmlWebpackPlugin({
                template: "jade!" + srcPath("index.jade")
            })
        ]
    })
}

if(TARGET === 'build') {
    module.exports = merge(common, {});
}

