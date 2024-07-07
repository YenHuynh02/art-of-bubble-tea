import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack, { Configuration as WebpackConfig } from 'webpack';

const config: WebpackConfig = {
  entry: path.join(__dirname, 'frontend', 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, './public'),
    filename: '[name].bundle.js',
    publicPath: '/',
    clean: true,
  },
  context: path.resolve(__dirname, 'frontend'),
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(vendor|node_modules|public)/,
        use: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/i, // .sass or .scss
        use: [
          MiniCssExtractPlugin.loader,
          // Creates `style` nodes from JS strings
          // 'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/[hash][ext][query]'
        }
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@backend': path.resolve(__dirname, 'backend')
    }
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
};

export default config;
