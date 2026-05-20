const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const browserSync = require('browser-sync').create();

const paths = {
  css: {
    src: 'docs/css/**/*.css',
    dest: 'dist/css/'
  },
  js: {
    src: 'docs/js/**/*.js',
    dest: 'dist/js/'
  },
  jsFiles: [
    './docs/js/jquery341.min.js',
    './docs/js/fotorama464.min.js',
    './docs/js/slick.min.js',
    './docs/js/main.js'
  ]
};

const clean = () => del(['dist/*']);

function html() {
  return gulp.src('docs/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}

// Копирование всех статических ресурсов (шрифты, CSS, JS)
function copyAssets() {
  return gulp.src([
    'docs/fonts/**/*',
    'docs/css/**/*.min.css',
    'docs/js/**/*.min.js',
    'docs/js/jquery.js'
  ], { base: 'docs' })
    .pipe(gulp.dest('dist'));
}

function img() {
  return gulp.src('docs/img/**/*')
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest('dist/img'));
}

function styles() {
  return gulp.src('docs/css/*.css', { ignore: 'docs/css/*.min.css' })
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(rename({ basename: 'main', suffix: '.min' }))
    .pipe(gulp.dest(paths.css.dest))
    .pipe(browserSync.stream());
}

function scripts() {
  return gulp.src(paths.jsFiles)
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: { baseDir: "./dist" }
  });
  gulp.watch('docs/**/*.html', html);
  gulp.watch('docs/css/**/*.css', styles);
  gulp.watch('docs/js/**/*.js', scripts);
  gulp.watch('docs/img/**/*', img);
  gulp.watch(['docs/fonts/**/*', 'docs/**/*.min.*'], copyAssets);
}

const build = gulp.series(clean, html, gulp.parallel(copyAssets, styles, scripts, img), watch);
const dev = gulp.series(clean, html, gulp.parallel(copyAssets, styles, scripts, img));

exports.clean = clean;
exports.html = html;
exports.copyAssets = copyAssets;
exports.styles = styles;
exports.scripts = scripts;
exports.img = img;
exports.watch = watch;
exports.dev = dev;
exports.build = build;
exports.default = build;
