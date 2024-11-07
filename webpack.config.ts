const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const postcssLoader = require('./postcss.config');
const webpack = require('webpack');
const dotenv = require('dotenv');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const env = dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` }).parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

const isProduction = process.env.NODE_ENV === 'production';


module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
     publicPath: '/',
    filename: isProduction ? '[name].[contenthash].js' : '[name].js',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      process: 'process/browser',
    },
  },
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'source-map' : 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include:/src/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        include:/src/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
     {
        test: /\.scss$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              // modules: true, // 启用 SCSS 模块
            },
          },
          'postcss-loader',
          'sass-loader',
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     postcssOptions: {
          //       postcssLoader
          //     }
          //   }
          // }
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 小于 8kb 的图片转为 Base64
              name: '[path][name].[ext]',
            },
          },
        ],
      }
    ],
  },
  optimization: {
    minimize: isProduction,
    concatenateModules: true, 
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
          compress: {
            drop_console: true,
          },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 50000,
      maxSize: 200000,
      minChunks: 2,
      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'reactVendor',
          chunks: 'all',
        },
        utilityVendor: {
          test: /[\\/]node_modules[\\/](lodash|moment|axios)[\\/]/,
          name: 'utilityVendor',
          chunks: 'all',
        },
      },      
    },    
    runtimeChunk: 'single',
    providedExports: true,
    usedExports: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
    new MiniCssExtractPlugin({
      filename: isProduction ? '[name].[contenthash].css' : '[name].css',
      chunkFilename: isProduction ? '[name].[contenthash].css' : '[name].css',
    }),    
    new webpack.DefinePlugin(envKeys),
    new NodePolyfillPlugin(),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin()
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
    compress: true,
    port: 9000,
    hot:true
  },
};
