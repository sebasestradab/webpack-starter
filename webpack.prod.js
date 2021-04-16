const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {
	mode: 'production',	// mode: 'production' --> Para generar los js y html minimizados
	optimization: {
		minimizer: [new OptimizeCssAssetsPlugin()]
	},
	output: {
		filename: 'main.[contenthash].js',
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
				  loader: "babel-loader",
				  /*options: {
					presets: ['@babel/preset-env']
				  }*/
				}
			},
			{
				test: /\.css$/,
				exclude: /styles\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /styles\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				test: /\.html$/i,
				loader: 'html-loader',
				options: {
					sources: false,
					minimize: false,
				},
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							esModule: false
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html',
            inject: 'body'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css', // para generar el nombre del archivo con un hash --> filename: '[name].[contenthash].css',
			ignoreOrder: false
		}),
		new CopyPlugin({
			patterns: [
				{from: 'src/assets', to: 'assets/'},
			],
		}),
		new MinifyPlugin()
	]
}