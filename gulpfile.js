/* Объявление всех функций */
const gulp = require('gulp');
const concat = require('gulp-concat-css');
const plumber = require('gulp-plumber');
const del = require('del');
const browserSync = require('browser-sync').create(); 

/* Перемещение HTML */
function html() {
    return gulp.src('src/**/*.html')
        .pipe(plumber())
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}));
}

exports.html = html; 

/* Перемещение css */
function css() {
    return gulp.src('src/blocks/**/*.css')
        .pipe(plumber())
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}));
}

exports.css = css; 

/* Перемещение изображений */
function images() {
    return gulp.src('src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({stream: true}));
}

exports.images = images; 

/* Перемещение шрифтов */
function fonts() {
    return gulp.src('src/fonts/**/*.{css,woff2,woff,otf,ttf,eot}')
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSync.reload({stream: true}));
}

exports.fonts = fonts;

/* Очистка и удаление dist/ */
function clean() {
  return del('dist');
}

exports.clean = clean;

/* Автоматический запуск всех команд */
const build = gulp.series(clean, gulp.parallel(html, css, images, fonts));

exports.build = build;

/* Отслеживание файлов */
function watchFiles() {
  gulp.watch(['src/**/*.html'], html);
  gulp.watch(['src/blocks/**/*.css'], css);
  gulp.watch(['src/images/**/*.{jpg,png,svg,gif,ico,webp,avif}'], images);
  gulp.watch(['src/fonts/**/*.{css,woff2,woff,otf,ttf,eot}'], fonts);
}

const watchapp = gulp.parallel(build, watchFiles, serve);

exports.watchapp = watchapp; 

/* Server */
function serve() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
} 

/* Вызов watchapp с помощью gulp */
exports.default = watchapp; 