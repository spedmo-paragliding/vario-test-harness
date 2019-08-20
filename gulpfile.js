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
  upload = require('gulp-upload'),
  log = require('fancy-log'),  
  terser = require('gulp-terser'),
  dir = {
    src         : 'src/',
    build       : 'build/',
    upload      : 'build-upload/'
  },
  buildFile = 'vario-package.zip';


  var options = {
    server: 'https://' + (process.argv[6]!=null ? process.argv[6] : 'www.spedmo.com') + '/bleApp/appVersionUpload.pg?uuid=' + process.argv[4],
    data: {
      dirname: dir.upload,
      fileName: buildFile
    },
    timeout: 30000,
    callback: function (err, data, res) {
      if (err) {
        log('error:' + err.toString());
      } else {
        log(data.toString());
      }
    }
  }

gulp.task('clean', (done) => {
  del.sync([ dir.build, dir.upload ]);
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
    .pipe(terser())
    .pipe(uglify())
    .pipe(gulp.dest(dir.build + 'js'))
});

gulp.task('server', function() {
  return gulp.src('.')
    .pipe(server({
      livereload: true,
      open: true,
      port: 8000
    }));
});

gulp.task('upload', function() {
  log("Uploading file to " + options.server);
  return gulp.src(dir.upload +  '**')
    .pipe(upload(options));
});

gulp.task('default', gulp.series('clean', 'styles', 'scripts', 'server', (done) => {
  gulp.watch(dir.src + 'sass/*', gulp.series('styles'));
  gulp.watch(dir.src + 'js/*', gulp.series('scripts'));
  done();
}));

// This task builds the package for upload to spedmo.com.
gulp.task('build', gulp.series('clean', 'styles', 'scripts', (done) => {
    gulp.src(dir.build +  '**')
        .pipe(zip(buildFile))
        .pipe(gulp.dest(dir.upload))
    done();
}));
