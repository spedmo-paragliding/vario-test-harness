const
  gulp = require('gulp'),
  del = require('del'),
  watch = require('gulp-watch'),
  zip = require('gulp-zip'),
  csso = require('gulp-csso'),
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify'),
  server = require('gulp-webserver'),
  concat = require('gulp-concat'),
  dir = {
    src         : 'src/',
    build       : 'build/'
  };

gulp.task('clean', (done) => {
  del.sync([ dir.build ]);
  done();
});

gulp.task('styles', function () {
  return gulp.src(dir.src + 'sass/styles.scss')
    .pipe(sass({
      outputStyle: 'nested',
      precision: 10,
      includePaths: ['.'],
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe(csso())
    .pipe(gulp.dest(dir.build + 'css'))
});

gulp.task('scripts', function() {
  return gulp.src(dir.src + 'js/**/*.js')
    .pipe(concat('vario.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dir.build + 'js'))
});

// gulp.task('pages', function() {
//   return gulp.src([dir.src + '/**/*.html'])
//     .pipe(htmlmin({
//       collapseWhitespace: true,
//       removeComments: true
//     }))
//     .pipe(gulp.dest('./dist'));
// });

gulp.task('server', function() {
  return gulp.src('.')
    .pipe(server({
      livereload: true,
      open: true,
      port: 8000
    }));
});

gulp.task('default', gulp.series('clean', 'styles', 'scripts', 'server', (done) => {
  gulp.watch(dir.src + 'sass/*', gulp.series('styles'));
  gulp.watch(dir.src + 'js/*', gulp.series('scripts'));
  done();
}));

// This task builds the package for upload to spedmo.com.
gulp.task('build', gulp.series('clean', 'styles', 'scripts', (done) => {
    gulp.src(dir.build +  '**')
        .pipe(zip('vario-package.zip'))
        .pipe(gulp.dest(dir.build))
    done();
}));
