const cssClient = {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
};

const cssServer = {
    test: /\.css$/,
    loader: 'null-loader',
};
module.exports = { cssClient, cssServer };
