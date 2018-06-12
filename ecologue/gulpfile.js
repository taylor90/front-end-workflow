'use strict';

//Gulp Modules
var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');

//var browserSync = require('browser-sync').create();

//Gulp compile sass
gulp.task('sass', function (){
  return gulp.src('./scss/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(cssnano())
  .pipe(gulp.dest('./css'))
});

//Gulp Minify css
// gulp.task('mincss', function(){
//   return gulp.src('./css/main.css')
//   .pipe(cssnano())
//   .pipe(gulp.dest('css'));
// });

// Static server
// gulp.task('browser-sync', function() {
//   browserSync.init({
//       server: {
//           baseDir: "./"
//       }
//   });
// });

// or...

// gulp.task('browser-sync', function() {
//   browserSync.init({
//       proxy: "localhost/my_project/source"
//   });
// });

// Watch Sass
gulp.task('watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
});

