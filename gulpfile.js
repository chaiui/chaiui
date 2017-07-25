'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
     del = require('del');


// javascript tasks
gulp.task("concatScripts", function() {
    return gulp.src([
        "js/utilities/element.js",
        "js/utilities/chai.js",
        "js/utilities/helper.js",
        "js/utilities/utility.js",
        "js/animations/*.js",
        "js/gui/*.js",
        "js/utilities/__init__.js"
    ])
    .pipe(maps.init())
    .pipe(concat("chai.js"))
    .pipe(maps.write("./"))
    .pipe(gulp.dest("src/js"));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
    return gulp.src(['src/js/chai.js'])
        .pipe(uglify())
        .pipe(rename("chai.min.js"))
        .pipe(gulp.dest("src/js"));
});

// sass & css tasks
gulp.task("compileSass", function() {
    return gulp.src("scss/chai.scss")
        .pipe(maps.init())
        .pipe(sass())
        .pipe(maps.write("./")) // relative to output dir (css)
        .pipe(gulp.dest("src/css"));
});

// watch task
gulp.task("watchFiles", function() {
    gulp.watch(["scss/**/*.scss"], ["compileSass"]);
    gulp.watch(["js/**/*.js"], ["concatScripts"]);
});

// clean task
gulp.task("clean", function() {
    del(["dist", "src/css/chai.css*", "src/js/chai*.js*"]);
});

// serve task
gulp.task("serve", ["watchFiles"]);

// build & default tasks
gulp.task("build", ["minifyScripts", "compileSass"], function() {
    return gulp.src(["css/chai.css", "js/chai.min.js", "index.html", "img/**", "fonts/**"], {base: './'})
                .pipe(gulp.dest("src"));
});
gulp.task("default", ["clean"], function() {
    gulp.start("build");
});