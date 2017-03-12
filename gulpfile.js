'use strict';

var gulp = require('gulp');
//1.第三方库的移动,模板移动
gulp.task('move',function(){
    gulp.src('src/lib/**/*')
               .pipe(gulp.dest('dist/lib/'))
               .pipe(browserSync.stream());
    gulp.src('src/templates/*')
        .pipe(gulp.dest('dist/templates/'))
        .pipe(browserSync.stream());
});

//1.less编译 css压缩
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');

gulp.task('style', function() {
    gulp.src('src/style/*.less')
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/style/'))
        .pipe(browserSync.stream());
    gulp.src('src/style/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('dist/style/'))
        .pipe(browserSync.stream());
});
//2.js合并，压缩，混淆
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('script', function() {
    return gulp.src('src/script/*.js')
        .pipe(concat('index.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/script/'))
        .pipe(browserSync.stream());
});
//3.图片的复制
var imagemin = require('gulp-imagemin');
gulp.task('images', function() {
    return gulp.src('src/images/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images/'))
        .pipe(browserSync.stream());
});
//4.html的压缩
var htmlmin = require('gulp-htmlmin');

gulp.task('htmlmin', function() {
    gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeStyleLinkTypeAttributes: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
    gulp.src('src/template/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeStyleLinkTypeAttributes: true
        }))
        .pipe(gulp.dest('dist/template/'))
        .pipe(browserSync.stream());
});

//5.browserSync服务和监视
var browserSync = require('browser-sync').create();

// Static server
gulp.task('server',['move','style','script','images','htmlmin'], function() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
    gulp.watch('src/lib/**/*', ['move']);
    gulp.watch('src/templates/*', ['move']);
    gulp.watch('src/style/*.less', ['style']);
    gulp.watch('src/script/*.js', ['script']);
    gulp.watch('src/images/*.*', ['images']);
    gulp.watch('src/*.html', ['htmlmin']);
    gulp.watch('dist/index.html').on('change', browserSync.reload);
});
