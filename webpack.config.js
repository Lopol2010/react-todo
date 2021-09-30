const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, options) => {
    let isDevelopment = options.mode == 'development'
    return {
        entry: './src/index.tsx',
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            clean: !isDevelopment
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
                        options: {
                            targets: isDevelopment ? 'last 2 versions' : 'defaults',
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react",
                                "@babel/preset-typescript"
                            ]
                        }
                    }
                },
                {
                    test: /\.sass$/,
                    exclude: /(node_modules|bower_components|\.module\.)/,
                    use: [
                        {
                            loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: 'css-loader',
                        },
                        'postcss-loader',
                        'sass-loader',
                    ]
                },
                {
                    test: /\.module\.sass$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        {
                            loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    auto: true,
                                    namedExport: true,
                                    localIdentName: isDevelopment ? "[name]__[local]--[hash:base64:5]" : "[hash:base64]",
                                }
                            }
                        },
                        'postcss-loader',
                        'sass-loader',
                    ]
                },
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'public/index.html',
                cache: isDevelopment,
                // hash: isDevelopment
            }),
            new MiniCssExtractPlugin(),
        ]
    }
}