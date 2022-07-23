module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        plugins: [new HtmlWebpackPlugin({ template: "../bs3/index.html" })],
      },
    ],
  },
};
