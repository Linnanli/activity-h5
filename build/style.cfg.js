var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var isProd = process.env.NODE_ENV === 'production';

module.exports = {
    cssLoader: [
        {
            test: /\.css$/,
            exclude: /node_modules/,
            use: !isProd
                ? ['style-loader', 'css-loader', 'postcss-loader']
                : ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader'
                    }]
                })
        },
        {
            test: /\.(scss|sass)$/,
            exclude: /node_modules/,
            use: !isProd
                ? ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader', {
                    loader: 'sass-resources-loader',
                    options: {
                        resources: path.resolve(__dirname, '../src/common/styles/global/index.scss')//将工具方法等挂载到全局
                    }
                }]
                : ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader'
                    }, {
                        loader: 'sass-loader'
                    }, {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: path.resolve(__dirname, '../src/common/styles/global/index.scss')//将工具方法等挂载到全局
                        }
                    }]
                })
        }
    ]
};