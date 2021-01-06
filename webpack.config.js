const path = require('path');
const webpack = require('webpack');
const MINICssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const dotenv = require('dotenv');
const dotenv = require('dotenv');
const { port, host_name } = require('./config');



module.exports = () => {
    /* This configuracion give access to the actions and other react component access to the .env variables */
    const env = dotenv.config().parsed;
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {
        entry: ['./src/front/index.js', `webpack-hot-middleware/client?path=${host_name}/__webpack_hmr&reload=true'`],
        context: path.resolve(__dirname),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'assets/app.js'
        },
        node: {
            fs: "empty"
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        {
                            loader: MINICssExtractPlugin.loader
                        },
                        // 'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader',
                        }
                    ]
                },
                {
                    test: /\.(png|gif|jpg)$/,
                    use: [
                        {
                            'loader': 'file-loader',
                            options: {
                                name: 'assets/[hash].[ext]'
                            }
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        devServer: {
            historyApiFallback: true,
            hot: true,
            port: port,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
            }
        },
        plugins: [
            new webpack.DefinePlugin(envKeys),
            new webpack.HotModuleReplacementPlugin(),
            new MINICssExtractPlugin({
                filename: 'assets/app.css'
            }),
            new HtmlWebpackPlugin({
                template: "./public/index.html",
                filename: "index.html",
            })
        ]
    }
};
