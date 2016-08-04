var webpack = require('webpack');
var gutil = require('gulp-util');
var config = require('../config.js');
var paths = config.paths;

var webpackConfig =	{
	entry: {
		main: paths.src.js + '/index.jsx',
	},
	output: {
		path: paths.dist.js,
		filename: '[name].js'
	},
	devtool: 'source-map',
	module: {
		preLoaders: [
			{test: /\.js$/, exclude: /node_modules/, loader: 'jscs'}
		],
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loader: 'babel?cacheDirectory&presets[]=es2015'},
			{test: /\.jsx$/, loader: 'babel?cacheDirectory&presets[]=es2015&presets[]=react'},
			{test: /\.json$/, loader: 'json'},
			{test: /\.css$/, loader: 'style!css!postcss'},
			{test: /\.(jpe?g|png|gif)$/i, loader: 'url'},
			{test: /\.svg$/i, loader: 'raw'}
		]
	},
	postcss: function () {
		return [
			require('autoprefixer'),
			require('lost')
		];
	},
	plugins: [
	]
};

module.exports = webpackConfig;
