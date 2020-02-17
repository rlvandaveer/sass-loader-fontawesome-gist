const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Configuration
const nodeModulesDir = path.resolve(__dirname, "node_modules");
const outDir = path.resolve(__dirname, "dist");
const srcDir = path.resolve(__dirname, "src");
const styleDir = path.resolve(__dirname, "styles");

module.exports = ({ production } = {}) => {
	return {
		devtool: production ? "source-map" : "eval-source-map",
		entry: {
			app: "./src/index.js"
		},
		mode: production ? "production" : "development",
		module: {
			rules: [
				{
					test: /\.ts$/,
					use: "ts-loader",
					exclude: /node_modules/
				},
				{
					test: /\.css$/,
					use: "css-loader"
				},
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
								sassOptions: {
									outputStyle: production ? "compressed" : "expanded"
								}
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
			})
		],
		resolve: {
			extensions: [".ts", ".js"]
		}
	}
};