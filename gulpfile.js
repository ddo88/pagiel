var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify'),
    // minify     = require('gulp-minify'),
    concat_css = require('@fomantic/gulp-concat-css'),
    clean_css  = require('gulp-clean-css'),
    imageop = require('gulp-image-optimization');;

gulp.task('compileJS', function (done) {
  gulp.src(['public/javascripts/core.js',
            'public/javascripts/io.js'])
  .pipe(concat('all.js'))
  .pipe(uglify())
  .pipe(gulp.dest('public/javascripts/build/'))

  done();
});


gulp.task('minifyJS', async function (done) {
  gulp.src(['public/javascripts/index.js',
            'public/javascripts/presentation.js',
            'public/javascripts/presentationChords.js',
            'public/javascripts/songsPrincipal.js',
            'public/javascripts/list.js'])
  .pipe(uglify())
  .pipe(gulp.dest('public/javascripts/build/'))

  done();
});

gulp.task('compileCSS',async function(done){
    
    gulp.src(['public/theme/assets/css/style.css',
              'public/stylesheets/custom.css',
              'public/theme/assets/css/animate.min.css'])
    .pipe(concat_css("all.css"))
    .pipe(clean_css({compatibility: 'ie8'}))
    .pipe(gulp.dest('public/stylesheets/'));

    done();
});

gulp.task('revealCSS',async function(done){
    
    gulp.src(['public/javascripts/revealjs/css/reveal.css',
              'public/javascripts/revealjs/css/theme/white.css',
              'public/javascripts/revealjs/lib/css/zenburn.css',
              'public/stylesheets/revealCustom.css'])
    .pipe(concat_css("revealAll.css"))
    .pipe(clean_css({compatibility: 'ie8'}))
    .pipe(gulp.dest('public/stylesheets/'));
    done();
});

gulp.task('compileIMG', function(cb) {
    gulp.src(['public/images/*.jpg',
    'public/theme/assets/img/*.jpg',
    ]).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('public/images/build')).on('end', cb).on('error', cb);
});