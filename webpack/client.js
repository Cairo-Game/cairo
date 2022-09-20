const path = require('path');
const { ts } = require('./loaders/ts-loader.ts');
const { cssClient } = require('./loaders/css-loader.ts');
const { svgClient } = require('./loaders/svg-loader.ts');
const { filesClient } = require('./loaders/files-loader.ts');
const { sassClient } = require('./loaders/sass-loader.ts');
const CopyPlugin = require('copy-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { IS_DEV, FRONTEND_DIR, BACKEND_DIR, DIST_DIR } = require('./env.ts');

const clientConfig = {
    mode: 'development',
    target: 'web',
    entry: {
        'main.js': path.resolve(FRONTEND_DIR, 'index.tsx'),
    },
    module: {
        rules: [ts, cssClient, svgClient, filesClient, sassClient],
    },
    output: {
        path: DIST_DIR,
        filename: '[name]',
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
        alias: {
            api: path.resolve(FRONTEND_DIR, 'assets'),
            components: path.resolve(FRONTEND_DIR, 'components'),
            hooks: path.resolve(FRONTEND_DIR, 'hooks'),
            models: path.resolve(FRONTEND_DIR, 'models'),
            services: path.resolve(FRONTEND_DIR, 'services'),
            store: path.resolve(FRONTEND_DIR, 'store'),
            styles: path.resolve(FRONTEND_DIR, 'styles'),
            pages: path.resolve(FRONTEND_DIR, 'pages'),
            typings: path.resolve(FRONTEND_DIR, 'typings'),
            utils: path.resolve(FRONTEND_DIR, 'utils'),
            constants: path.resolve(FRONTEND_DIR, 'constants'),
        },
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: '**/*',
                    context: path.resolve(FRONTEND_DIR, 'assets'),
                    to: './assets',
                },
            ],
        }),
        new DotenvWebpackPlugin(),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            maximumFileSizeToCacheInBytes: 5000000,
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/bundle-scss.css',
            chunkFilename: 'assets/css/bundle-scss.css',
        }),
    ],
};

module.exports = clientConfig;
