var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var nodemon = require('gulp-nodemon');
var eventstream = require('event-stream');

gulp.task('sass', function() {
  gulp.src('style/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('css', function() {
  var bowerStyles = gulp.src([
    'bower_components/bootstrap/dist/css/bootstrap.min.css',
    'bower_components/bootstrap/dist/css/bootstrap-theme.min.css'
  ]);
  var myStyles = gulp.src('style/**/*.scss')
    .pipe(sass({
      style: 'compressed'
    }).on('error', sass.logError));
  return eventstream.concat(bowerStyles, myStyles)
    .pipe(minifyCss())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    .pipe(concat('style.min.css'))
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

gulp.task('develop', function() {
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

gulp.task('prod', function() {
  nodemon({
    script: './server.js',
    env: {
      'NODE_ENV': 'production'
    }
  });
})

gulp.task('default', ['css', 'script', 'prod']);
