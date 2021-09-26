const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: { extensions: ['.js', '.ts', '.tsx', '.sass'] },
    devServer: {
        static: './dist',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //     targets: "defaults",
                    //     presets: [
                    //         '@babel/preset-env',
                    //         '@babel/preset-react',
                    //         '@babel/preset-typescript'
                    //     ],
                    // }
                }
            },
            {
                test: /\.sass$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'sass-loader',
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        })
    ]
};