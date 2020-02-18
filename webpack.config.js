const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Configuration
const nodeModulesDir = path.resolve(__dirname, "node_modules");
const outDir = path.resolve(__dirname, "dist");
const srcDir = path.resolve(__dirname, "src");
const styleDir = path.resolve(__dirname, "styles");

module.exports = ({ production } = {}) => {
	return {
		devServer: {
			contentBase: "./dist"
		},
		entry: {
			app: "./src/index.js"
		},
		module: {
			rules: [
				{
					test: /\.s[ac]ss$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader
						},
						{
							loader: "css-loader"
						},
						{
							loader: "sass-loader",
							options: {
								implementation: require("sass"), //require("node-sass")
								sassOptions: {
									outputStyle: production ? "compressed" : "expanded"
								}
							}
						}
					]
				},
				{
				  test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				  use: [
					{
					  loader: "file-loader",
					  options: {
						name: "[name].[ext]"
					  }
					}
				  ]
				}
			]
		},
		output: {
			chunkFilename: production ? "[name].[chunkhash].chunk.js" : "[name].chunk.js",
			filename: production ? "[name].bundle.js" : "[name].bundle.js", //"[name].[chunkhash].bundle.js"
			path: outDir,
			publicPath: "/"
		},
		plugins: [
			new CleanWebpackPlugin(),
			new MiniCssExtractPlugin({
				filename: production ? "[name].css" : "[name].css", //"[name].[contenthash].css"
				chunkFilename: production ? "[id].[contenthash].css" : "[id].css",
			}),
			new HtmlWebpackPlugin({
				template: "src/index.ejs"
			})
		],
		resolve: {
			extensions: [".ts", ".js"]
		}
	}
};