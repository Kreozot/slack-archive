var gulp = require('gulp');
var config = require('../config.js');
var paths = config.paths;
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var gutil = require('gulp-util');
var del = require('promised-del');

gulp.task('clean-js', function() {
    return del([
        paths.dist.js + '/**/*.js',
        paths.dist.js + '/**/*.js.map'
    ]);
});

gulp.task('build-js', ['clean-js'], function (callback) {
    webpack(webpackConfig, function (err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack', err)
        };
        gutil.log('[webpack]', stats.toString({}));
        callback();
    });
});

gulp.task('watch-js', ['build-js'], function() {
    return gulp.watch([
        paths.src.js + '/**/*.js',
        paths.src.js + '/**/*.jsx',
        paths.src.js + '/**/*.css'
    ], ['build-js']);
});
