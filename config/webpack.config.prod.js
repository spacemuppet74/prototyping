const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// extract css into it's own file
const miniCSSExtractPlugin = new MiniCssExtractPlugin({
  filename: "css/styles.css",
  chunkFilename: "[id].css"
});

// create a html file to upload with links to the style and js files
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  title: "React BoilerPlate",
  template: "./public/index.html",
  filename: "index.html"
});

// clear the dis directory
const cleanWebpackPlugin = new CleanWebpackPlugin(
  [path.resolve(__dirname, "..", "dist")],
  { verbose: true, allowExternal: true }
);

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: ["@babel/polyfill", "whatwg-fetch", "./src/index.js"],
  output: {
    chunkFilename: "[name].[chunkhash:4].js",
    filename: "[name].[chunkhash:4].js",
    path: path.resolve(__dirname, "..", "dist"),
    publicPath: "/apps/nzbs_applications/uniform_requests/" // need the correct path to were the files are stored in Sharepoint
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "font/[name].[ext]",
              publicPath: "/apps/nzbs_applications/uniform_requests/css/fonts"
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "css/fonts/",
              publicPath: "/apps/nzbs_applications/uniform_requests/css/fonts"
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true }
          },
          {
            loader: "postcss-loader",
            options: {
              autoprefixer: {
                browsers: ["last 2 versions", "ie > 9"]
              },
              sourceMap: true,
              plugins: () => [require("autoprefixer")]
            }
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "..", "src")
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        bundle: {
          name: "bundle",
          chunks: "all",
          minChunks: 3,
          reuseExistingChunk: false
        },
        vendor: {
          chunks: "initial",
          name: "vendor",
          test: /[\\/]node_modules[\\/]/
        },
        styles: {
          name: "styles",
          test: /\.s?css$/,
          chunks: "all",
          enforce: false
        }
      }
    }
  },
  plugins: [
    cleanWebpackPlugin,
    miniCSSExtractPlugin,
    htmlWebpackPlugin,
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ]
};
