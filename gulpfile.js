let gulp = require('gulp'),
    sass = require('gulp-sass'),
    spritesmith = require('gulp.spritesmith'),
    uglify = require('gulp-minify'),
    uglifyJS = require('uglify-js2'),
    cleanCSS = require('gulp-clean-css'),
    useref = require('gulp-useref'),
    wait = require('gulp-wait'),
    del = require('del');

  gulp.task('sprite', () => {
    var spriteData = gulp.src('./src/img/thumbs/*')
      .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite.css'
    }));
    return spriteData.pipe(gulp.dest('./src/img/'));
  });

  gulp.task('sass', () => {
    gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css/'));
  });

  gulp.task('sass:watch', () => {
    gulp.watch('./src/scss/**/*.scss', ['sass']);
  });

  gulp.task('concate', function() {
    return gulp.src('src/*.html', {base: 'src'})
        .pipe(wait(1000))
        .pipe(useref())
        .pipe(uglify())
        .pipe(gulp.dest('./'));
  });

  gulp.task('clean', function() {
    del(['./css/*.css', './js/*.js', './index.html']);
  });

  gulp.task('minify', ['concate'], function() {
    gulp.src('src/css/styles.css', {base: 'src'})
        .pipe(wait(1000))
        .pipe(cleanCSS({compatibility: '*'}))
        .pipe(gulp.dest('./'))

  });

  gulp.task('build', ['clean', 'minify'], function() {
    gulp.src(['src/img/*', 'src/index.html'], {base: 'src'})
        .pipe(wait(1000))
        .pipe(gulp.dest('./'));
  });
