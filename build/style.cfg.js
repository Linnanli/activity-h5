var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var isProd = process.env.NODE_ENV === 'production';

module.exports = {
    cssLoader: [
        {
            test: /\.css$/,
            include: path.resolve(__dirname, '../src'),
            use: !isProd
                ? ['style-loader', 'css-loader','postcss-loader']
                : ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            sourceMap: true
                        }
                    },{
                        loader:'postcss-loader'
                    }]
                })
        }
    ]
};