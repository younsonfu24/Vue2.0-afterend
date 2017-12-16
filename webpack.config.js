const path = require('path');
const htmlWP = require('html-webpack-plugin');
const devServer = require('webpack-dev-server');

module.exports = {

    // 入口
    entry: path.resolve(__dirname, './src/main.js'),

    // 输出
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },

    // 由此，实现了只用小串代码 “webpack” 就可以打包 js 文件，之前要这么长 "webpack ./src/main.js ./dist/bundle.js"

    plugins: [
        new htmlWP({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html'
        })
    ],

    // 到这里，又进了一步了。打包好的 bundle 文件会被自动链接到一个生成的 html 文档中，不用自己手动加了

    // devServer: {
    //     contentBase: 'dist',
    //     open: true,
    //     port: 8888,
    //     host: '127.0.0.24'
    // },

    // 模块配置
    module: {
        // 配置loader
        rules: [
            // 添加 CSS 模块的处理，css-loader 的作用是打包css，而style-loader是执行 CSS
            {
                test: /\.css$/, // 配置要打包的文件类型
                use: ['style-loader', 'css-loader'] // 匹配到的文件使用什么 loader 来处理
            },
            // 添加 less 模块的处理
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            // 添加静态资源模块的打包处理
            {
                test: /\.(gif|png|jpg|jpeg|svg)/,
                // 字体图标， 媒体文件都可以配置
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        name: '[name]_[hash:8].[ext]'
                    }
                }]
            },
            // 添加 JS 模块的处理，把 JS 转换为 ES5
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            // 添加 Vue 模块的解析打包处理
            // Vue文件中，使用 vbase+tab 可以快速生成基本模板
            {
                test: /\.vue$/,
                use: ['vue-loader']
            }
        ]
    }
}