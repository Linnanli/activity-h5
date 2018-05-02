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
                ? ['style-loader', 'css-loader', 'sass-loader', {
                    loader: 'sass-resources-loader',
                    options: {
                        resources: path.resolve(__dirname, '../src/common/styles/global.scss')//将工具方法等挂载到全局
                    }
                },'postcss-loader']
                : ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader'
                    }, {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: path.resolve(__dirname, '../src/common/styles/global.scss')//将工具方法等挂载到全局
                        }
                    },{
                        loader: 'postcss-loader'
                    }]
                })
        }
    ]
};