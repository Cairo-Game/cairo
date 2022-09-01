const filesClient = {
  test: /\.(png|jpe?g|gif)$/i,
  use: [
    {
      loader: "file-loader",
    },
  ],
};

const filesServer = {
  loader: "null-loader",
  test: /\.(png|jpe?g|gif)$/i,
};

module.exports = { filesClient, filesServer };
