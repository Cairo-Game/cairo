const ts = {
    test: /\.ts(x?)$/,
    exclude: /node_modules/,
    use: { loader: 'ts-loader' },
};

module.exports = { ts };
