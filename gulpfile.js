// global path 
const buildFolder = `./dist`;
const srcFolder = `./src`;

// path
const path = {
    build: {
        html: `${buildFolder}/`,
        js: `${buildFolder}/js/`,
        css: `${buildFolder}/css/`,
        images: `${buildFolder}/img/`,
        addition: `${buildFolder}/addition/`,
    },
    src: {
        html: `${srcFolder}/*.html`,
        js: `${srcFolder}/js/script.js`,
        scss: `${srcFolder}/scss/style.scss`,
        scss_watch: `${srcFolder}/scss/*.*`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg}`,
        addition: `${srcFolder}/addition/**/*.*`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
};

// gulp
var { src, dest, series, parallel, watch } = require('gulp');

// plugin
var clean = require('gulp-clean');
var sass = require('gulp-sass')(require('sass'));
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');

// server
function browserSyncFunc() {
    browserSync.init({
        server: {
            baseDir: path.buildFolder
        }
    });
}

// tasks
function html() {
    return src(path.src.html)
        .pipe(dest(path.build.html))
        .pipe(browserSync.stream());
}

function scss() {
    return src(path.src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(path.build.css))
        .pipe(browserSync.stream());
}

function js() {
    return src(path.src.js)
        .pipe(dest(path.build.js))
        .pipe(browserSync.stream());
}

function images() {
    return src(path.src.images)
        .pipe(imagemin())
        .pipe(dest(path.build.images))
        .pipe(browserSync.stream());
}

function addition() {
    return src(path.src.addition)
        .pipe(dest(path.build.addition))
        .pipe(browserSync.stream());
}

function cleanFolder() {
    return src(path.buildFolder)
        .pipe(clean());
}
// watcher
function watcher() {
    watch(path.src.html, html);
    watch(path.src.scss_watch, scss);
    watch(path.src.js, js);
    watch(path.src.images, images);
    watch(path.src.addition, addition);
}

exports.default = series(cleanFolder, html, scss, js, images, addition, parallel(browserSyncFunc, watcher));