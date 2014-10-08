'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var _ = require('underscore');
var del = require('del');  // Deletes files
var gutil = require('gulp-util');
var watchify = require('watchify');

var singletonBrowserify = {
    getName : function () {
        var version = require('./package.json').version;
        var name = require('./package.json').name;
        return version + '.' + name + '.' + 'min';
    },

    params : {
        entries: ['./app/app.js'],
        debug: true
    },

    getBundler : function(params) {
        return browserify(params || this.params);
    },

    compile : function() {
        return this.getBundler()
            .bundle()
            .pipe(source(this.getName() + '.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            // Add transformation tasks to the pipeline here.
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./built/js/'));
    },

    watchify : function () {
        var params = _.extend(this.params, watchify.args);
        var bundler = watchify( this.getBundler(params) );
        //bundler.transform('brfs');

        bundler
            .on('update', this.compile)
            .on('error', gutil.log.bind(gutil, 'Browserify Error'));

        return this.compile();
    }
}

gulp.task('javascript', function() {
    return singletonBrowserify.compile();
});

gulp.task('watch', function() {
    return singletonBrowserify.watchify();
});

gulp.task('clean', function(done) {
    del(['built'], done);
});

gulp.task('default', function() {
    console.log( "default task" );
});