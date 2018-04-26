var config = {
    entry: './index.js',

    output: {
        path: '/',
        filename: 'bundle.js',
    },

    devServer: {
        inline: true,
        port: 7777,
        // contentBase: 'static',
        proxy: {
            '/api/*': {
                target: 'http://localhost:3000/',
            },
            historyApiFallback: true,
        }
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader'
            },
            {
                test: /\.css$/,
                loader: 'css-loader'
            }
        ]
    }
}

module.exports = config;