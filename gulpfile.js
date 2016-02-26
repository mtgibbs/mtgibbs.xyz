var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var nodemon = require('gulp-nodemon');
var streamqueue = require('streamqueue');
var cssnano = require('gulp-cssnano');

gulp.task('css', function() {
  return streamqueue({objectMode: true},
    gulp.src([
      'bower_components/bootstrap/dist/css/bootstrap.min.css',
      'bower_components/bootstrap/dist/css/bootstrap-theme.min.css'
    ]),
    gulp.src('style/**/*.scss').pipe(sass({ style: 'compressed' }))
  )
  .pipe(concat('style.min.css'))
  .pipe(cssnano())
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
  .pipe(gulp.dest('dist/css'));
});

gulp.task('script', function() {
  gulp.src([
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/bootstrap/dist/js/bootstrap.min.js',
      'bower_components/typed.js/dist/typed.min.js',
      'scripts/**/*.js'
    ])
    .pipe(uglify())
    .pipe(concat('script.min.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
  gulp.watch('style/**/*.scss', ['css']);
  gulp.watch('scripts/**/*.js', ['script']);
});

gulp.task('dev', function() {
  gulp.start('script');
  gulp.start('css');
  nodemon({
      script: './server.js',
      env: {
        'NODE_ENV': 'development'
      },
      ignore: ['/dist']
    })
    .on('start', ['watch']);
});

gulp.task('build', ['css', 'script']);
