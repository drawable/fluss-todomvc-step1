/**
 * Created by Stephan on 13.01.2015.
 */

"use strict";

var gulp = require('gulp');
var typescript = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');

gulp.task("compile", function() {
    var tsResult = gulp.src(["./App/**/*.ts"])
        .pipe(sourcemaps.init())
        .pipe(typescript({
            module: "amd",
            target: "ES5"
        }));
    return tsResult.js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./App"));
});

gulp.task("build", ["compile"], function() {
    gulp.src("./App/**/*.js")
       .pipe(gulp.dest("./Build/App"));

    gulp.src("./App/**/*.html")
        .pipe(gulp.dest("./Build/App"));

    gulp.src("./node_modules/fluss/**/*.js")
        .pipe(gulp.dest("./Build/node_modules/fluss"));

    gulp.src("./node_modules/requirejs/**/*.js")
        .pipe(gulp.dest("./Build/node_modules/requirejs"));

    gulp.src("./node_modules/domready/**/*.js")
        .pipe(gulp.dest("./Build/node_modules/domready"));

    gulp.src("./node_modules/react/**/*.js")
        .pipe(gulp.dest("./Build/node_modules/react"));

    gulp.src("./node_modules/todomvc-common/**/*")
        .pipe(gulp.dest("./Build/node_modules/todomvc-common"));
});
