var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    // minify     = require('gulp-minify'),
    concat_css = require('gulp-concat-css'),
    clean_css  = require('gulp-clean-css');

gulp.task('compileJS', function () {
  gulp.src(['public/javascripts/core.js',
            'public/javascripts/io.js'])
  .pipe(concat('all.js'))
  .pipe(uglify())
  .pipe(gulp.dest('public/javascripts/build/'))
});


gulp.task('minifyJS', function () {
  gulp.src(['public/javascripts/index.js',
            'public/javascripts/presentation.js',
            'public/javascripts/presentationChords1.js',
            'public/javascripts/songsPrincipal.js',
            'public/javascripts/list.js'])
  .pipe(uglify())
  .pipe(gulp.dest('public/javascripts/build/'))
});

gulp.task('compileCSS',function(){
    
    gulp.src(['public/theme/assets/css/style.css',
              'public/stylesheets/custom.css',
              'public/theme/assets/css/animate.min.css'])
    .pipe(concat_css("all.css"))
    .pipe(clean_css({compatibility: 'ie8'}))
    .pipe(gulp.dest('public/stylesheets/'));
});

gulp.task('revealCSS',function(){
    
    gulp.src(['public/javascripts/revealjs/css/reveal.css',
              'public/javascripts/revealjs/css/theme/white.css',
              'public/javascripts/revealjs/lib/css/zenburn.css',
              'public//stylesheets/revealCustom.css'])
    .pipe(concat_css("revealAll.css"))
    .pipe(clean_css({compatibility: 'ie8'}))
    .pipe(gulp.dest('public/stylesheets/'));
});