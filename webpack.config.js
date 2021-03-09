const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') // 运行 成功失败后的提示语
const { CleanWebpackPlugin }  = require('clean-webpack-plugin') // 清空目录
const MiniCssExtractPlugin = require('mini-css-extract-plugin');// css 分离
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css 压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') // js 压缩
// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

/**
 * mode=“production”, 会自动添加 uglifyJsPlugin功能，不需要额外配置 mode=“development”, 就算添加了 uglifyJsPlugin配置，也不会起作用
 * 必须配置devtool
 */

const resolve = function(dir) {
    return path.join(__dirname, dir)
}
const isDev = process.env.NODE_ENV !== 'production'
const chunkhash = isDev ? '[name].[hash:8].js' : '[name].[chunkhash:8].js';
const contenthash = isDev ? '[name].[hash:8].css' : '[name].[contenthash:8].css';
console.log(isDev)
module.exports = {
    // context: path.resolve(__dirname, '../'),
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'cheap-module-eval-source-map' : '#source-map', // 生成map文件
    entry: {
       app: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: chunkhash
    },
    resolve: {
        extensions: ['.vue', '.js', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
    // 优化
    optimization: {
        runtimeChunk: {
            name: 'mainfest' // 生成mainfest.js 文件 chunk的依赖关系
        },
        // 代码分离  将第三方库打包在一起由于用到的是chunkhash 第三方库的chunkhash基本不变 所以起到了持久化缓存的作用。
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial', // 只打包初始依赖的第三方
                    name: 'vendor',
                },
                axios: {
                    test: /[\\/]node_modules[\\/]axios[\\/]/, // 这里可以单独把包打出来
                    name: 'axios'
                }
            }
        },
        // 代码压缩
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                cache: true,
                parallel: true
            }),
            new OptimizeCSSAssetsPlugin()
        ]
    },
    devServer: {
        // https: true,
        open: true,
        host: '0.0.0.0',
        port: 8000,
        disableHostCheck: true,
        hot: true,
        proxy: {//配置跨域，访问的域名会被代理到本地的3000端口
            '/api': 'http://localhost:3000'
        },
        stats: "none" // 去掉运行成功后的默认日志提示
    },
    plugins: [
        ...(isDev ? [] : [new CleanWebpackPlugin()]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'body',
            // hash: true
        }),
        new MiniCssExtractPlugin({
            filename: contenthash,
            chunkFilename: contenthash,
        }),
        new VueLoaderPlugin(),
        new FriendlyErrorsPlugin({
            // 运行成功
            compilationSuccessInfo: {
                messages: ['运行成功']
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [resolve('src')],
                loader: 'babel-loader?cacheDirectory'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader?cacheDirectory',
            },
            {
                test: /\.css$/,
                // loader: 'style-loader',
                use: [
                    // 'style-loader', // style-loader 和 MiniCssExtractPlugin.loader 会冲突 前者是将css内联 后者是将其分离成单独的包
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ]
            }
        ]
    }
}