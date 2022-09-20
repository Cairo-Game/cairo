const svgClient = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: ['@svgr/webpack'],
};

const svgServer = {
    test: /\.svg$/i,
    loader: 'null-loader',
};

module.exports = { svgClient, svgServer };
