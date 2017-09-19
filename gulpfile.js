let gulp = require('gulp'),
    sass = require('gulp-sass');

    gulp.task('sass', () => {
      gulp.src('./src/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./src/css/'));
    });

    gulp.task('sass:watch', () => {
      gulp.watch('./src/scss/**/*.scss', ['sass']);
    });
