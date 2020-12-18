const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключили плагин

const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

module.exports = {
  entry: { main: './src/pages/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      // добавили правило для обработки файлов
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif)$/,
        // при обработке этих файлов нужно использовать file-loader
        loader: 'file-loader'
      },
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(otf|ttf|woff|woff2)$/,
        // при обработке этих файлов нужно использовать file-loader
        loader: 'file-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { importLoaders: 1 }
            },
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html'
    }),
    new MiniCssExtractPlugin()
]
};