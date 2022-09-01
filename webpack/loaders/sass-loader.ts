const sassClient = {
  test: /\.s[ac]ss$/i,
  use: ["style-loader", "css-loader", "sass-loader"],
};

const sassServer = {
  test: /\.s[ac]ss$/i,
  loader: "null-loader",
};

module.exports = { sassClient, sassServer };
