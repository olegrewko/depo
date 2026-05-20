const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const browserSync = require('browser-sync').create();
const fs = require('fs');
const path = require('path');

// Очистка папки dist
const clean = () => del(['dist/*']);

// Функция для встраивания CSS и JS в HTML

// В функции inlineAssets замените обработку CSS на эту:
contents = contents.replace(/<link rel="stylesheet" href="([^"]+\.css)">/g, (match, cssPath) => {
  try {
    const fullPath = path.join('docs', cssPath);
    if (fs.existsSync(fullPath)) {
      let cssContent = fs.readFileSync(fullPath, 'utf8');
      // НЕ минифицируем CSS, чтобы не сломать медиа-запросы
      return `<style>${cssContent}</style>`;
    }
  } catch (e) {
    console.log(`Ошибка при встраивании CSS: ${cssPath}`);
  }
  return match;
});
// Обработка HTML с встраиванием
function html() {
  return gulp.src('docs/*.html')
    .pipe(inlineAssets())
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}

// Копирование шрифтов
function fonts() {
  return gulp.src('docs/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
}

// Копирование изображений
function img() {
  return gulp.src('docs/img/**/*')
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest('dist/img'));
}

// Watch режим
function watch() {
  browserSync.init({
    server: { baseDir: "./dist" }
  });
  gulp.watch('docs/**/*.html', html);
  gulp.watch('docs/css/**/*.css', html);
  gulp.watch('docs/js/**/*.js', html);
  gulp.watch('docs/img/**/*', img);
  gulp.watch('docs/fonts/**/*', fonts);
}

// Основные задачи
const build = gulp.series(clean, gulp.parallel(fonts, img, html), watch);
const dev = gulp.series(clean, gulp.parallel(fonts, img, html));

// Экспорт задач
exports.clean = clean;
exports.html = html;
exports.fonts = fonts;
exports.img = img;
exports.watch = watch;
exports.dev = dev;
exports.build = build;
exports.default = build;
