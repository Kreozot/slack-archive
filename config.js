var path = require('path');

var secret = require('./secret.json');

module.exports = {
	paths: {
		root: path.resolve('.'),
		src: {
			js: path.resolve('./src')
		},
		dist: {
			js: path.resolve('./public')
		}
	},
	devServer: {
		host: 'localhost',
		port: 5000
	},
	db: secret
}
