var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
  gulp.src('style/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('script', function() {
  gulp.src('scripts/**/*.js')
    .pipe(uglify())
    .pipe(concat('script.min.js'))
    .pipe(gulp.dest('dist/js'));
});

//Watch task
gulp.task('default', function() {
  gulp.watch('style/**/*.scss', ['sass']);
});
