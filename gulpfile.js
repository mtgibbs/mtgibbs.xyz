var gulp = require('gulp');
var webpack = require('gulp-webpack');

gulp.task('watch', function() {
  gulp.watch('style/**/*.scss', ['css']);
  gulp.watch('scripts/**/*.js', ['script']);
});

gulp.task('webpack', function() {
  return gulp.src('src/')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('dist/'))
});
