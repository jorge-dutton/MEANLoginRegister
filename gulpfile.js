var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint');

gulp.task('jshint', function () {
    gulp.src(['./index.js',
        './routes/*.js',
        '*/models/*.js',
        '*/controllers/*.js',
        '*/config/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));

});

gulp.task('build', function () {
    gulp.src('**/*.js')
        .pipe(uglify().on('error', gutil.log))
        .pipe(gulp.dest('./build/followings.min.js'));
});