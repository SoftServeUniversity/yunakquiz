var gulp = require('gulp');

// KARMA TESTING

var Server = require('karma').Server;

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function() { done(); }).start();
});

gulp.task('default', function() {
	console.log("Welcome to GULP");
})