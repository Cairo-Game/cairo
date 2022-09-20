const path = require('path');
const { ts } = require('./loaders/ts-loader.ts');
const { cssServer } = require('./loaders/css-loader.ts');
const { sassServer } = require('./loaders/sass-loader.ts');
const { filesServer } = require('./loaders/files-loader.ts');
const { svgServer } = require('./loaders/svg-loader.ts');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { BACKEND_DIR, DIST_DIR } = require('./env.ts');

const serverConfig = {
    mode: 'development',
    target: 'node',
    node: {
        __dirname: false,
    },
    externals: [nodeExternals()],
    entry: {
        'server.js': path.resolve(BACKEND_DIR, 'server.tsx'),
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
    },
    module: {
        rules: [ts, cssServer, filesServer, sassServer, svgServer],
    },
    output: {
        path: path.resolve(DIST_DIR, 'server'),
        filename: '[name]',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'assets/css/bundle-scss.css',
            chunkFilename: 'assets/css/bundle-scss.css',
        }),
    ],
};

module.exports = serverConfig;
