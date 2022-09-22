const filesClient = {
    test: /\.(png|jpe?g|gif|mp3)$/i,
    use: [
        {
            loader: 'file-loader',
        },
    ],
};

const filesServer = {
    loader: 'null-loader',
    test: /\.(png|jpe?g|gif|mp3)$/i,
};

module.exports = { filesClient, filesServer };
