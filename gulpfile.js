const babel = require("gulp-babel");
const del = require("del");
const fs = require("fs");
const gulp = require("gulp");
const postcss = require("gulp-postcss");
const replace = require("gulp-replace");
const uglify = require("gulp-uglify");

// Styles

gulp.task("styles:compress", () => {
    return gulp
        .src("src/styles/styles.css")
        .pipe(postcss([require("postcss-import"), require("postcss-csso")]))
        .pipe(gulp.dest("docs"));
});

gulp.task("styles:inline", () => {
    return gulp
        .src("docs/**/*.html")
        .pipe(
            replace(
                /<link rel="stylesheet" href="\/styles\/styles.css">/,
                () => {
                    const style = fs.readFileSync("docs/styles.css", "utf8");
                    return "<style>" + style + "</style>";
                }
            )
        )
        .pipe(gulp.dest("docs"));
});

// Scripts

gulp.task("scripts:compress", () => {
    return gulp
        .src("src/scripts/scripts.js")
        .pipe(
            babel({
                presets: ["@babel/preset-env"],
            })
        )
        .pipe(uglify())
        .pipe(gulp.dest("docs"));
});

gulp.task("scripts:inline", () => {
    return gulp
        .src("docs/**/*.html")
        .pipe(
            replace(
                /<script src="\/scripts\/scripts.js" defer><\/script>/,
                () => {
                    const script = fs.readFileSync("docs/scripts.js", "utf8");
                    return "<script>" + script + "</script>";
                }
            )
        )
        .pipe(gulp.dest("docs"));
});

gulp.task("clean", () => {
    return del([
        "docs/styles",
        "docs/styles.css",
        // "docs/scripts",
        // "docs/scripts.js",
    ]);
});

// Build

gulp.task(
    "build",
    gulp.series(
        "styles:compress",
        "styles:inline",
        "scripts:compress",
        "scripts:inline",
        "clean"
    )
);
