const lessClient = {
    test: /\.less$/,
    use: ['style-loader', { loader: 'css-loader', options: { sourceMap: 1 } }, 'postcss-loader', 'less-loader'],
};

module.exports = { lessClient };
