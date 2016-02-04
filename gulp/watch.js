var gulp = require('gulp');
var config = require('../config.js');
var open = require('gulp-open');

gulp.task('watch', ['watch-js'], function () {
	gulp.src(__filename)
		.pipe(open({uri: 'http://localhost:' + config.devServer.port}));
});
