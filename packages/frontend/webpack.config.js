const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].bundle.js',
    clean: true,
    assetModuleFilename: '[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    alias: {
      api: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      models: path.resolve(__dirname, 'src/models'),
      services: path.resolve(__dirname, 'src/services'),
      store: path.resolve(__dirname, 'src/store'),
      styles: path.resolve(__dirname, 'src/styles'),
      pages: path.resolve(__dirname, 'src/pages'),
      typings: path.resolve(__dirname, 'src/typings'),
      utils: path.resolve(__dirname, 'src/utils'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'www', 'index.html'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: '**/*',
          context: path.resolve(__dirname, 'src/assets'),
          to: './assets',
        },
      ],
    }),
    new DotenvWebpackPlugin()
  ],
};
