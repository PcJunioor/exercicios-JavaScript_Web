﻿const gulp = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')(require('node-sass'))
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')
const htmlmin = require('gulp-htmlmin')

// BUILD DO HTML
function appHTML(){
    return gulp.src('src/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('build/'))
}

// BUILD DO CSS
function appCSS(){
    return gulp.src('src/assets/sass/index.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(uglifycss({"uglifyComments": true}))
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('build/assets/css'))
}

// BUILD DO JS
function appJS(){
    return gulp.src('src/assets/js/**/*.js')
        .pipe(babel({presets: ['ENV']}))
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('build/assets/js'))
}

// BUILD DE IMG
function appIMG(){
    return gulp.src('src/assets/imgs/*.*')
        .pipe(gulp.dest('build/assets/imgs'))
}

//registra a task para reusar 
gulp.task('appHTML', appHTML) 
gulp.task('appCSS', appCSS) 
gulp.task('appJS', appJS) 
gulp.task('appIMG', appIMG) 

module.exports = {
    appHTML,
    appCSS,
    appJS,
    appIMG
}