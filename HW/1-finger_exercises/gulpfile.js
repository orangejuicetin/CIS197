var gulp = require('gulp');
var eslint = require('gulp-eslint');

var PATH = 'exercises.js';

gulp.task('eslint', function () {
  return gulp.src(PATH)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('default', ['eslint']);
