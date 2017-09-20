let gulp = require('gulp'),
    sass = require('gulp-sass'),
    spritesmith = require('gulp.spritesmith');

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
