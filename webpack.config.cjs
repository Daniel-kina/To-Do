const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // Makes debugging easier
  entry: './src/index.js', // Your main JS file
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Cleans the /dist folder before every build
  },
  devtool: 'inline-source-map', // Shows you error lines in your original code, not the bundled code
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Uses your HTML file as a template
      title: 'Todo List',
      inject: 'body', // Puts the script tag at the bottom of the body
    }),
  ],
  devServer: {
    static: './dist',
    watchFiles: ['./src/**/*.html'], // Tells webpack to reload when HTML changes
  },

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/i, // Looks for .css files
        use: ['style-loader', 'css-loader'], // style-loader injects CSS into DOM, css-loader interprets @import
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i, // Looks for image files
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // Add this for fonts
        type: 'asset/resource',
      },
    ],
  },
};