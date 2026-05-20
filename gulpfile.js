const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const browserSync = require('browser-sync').create();
const fs = require('fs');
const path = require('path');

// Очистка папки dist
const clean = () => del(['dist/*']);

// Функция для встраивания CSS и JS в HTML
function inlineAssets() {
  const Transform = require('stream').Transform;

  return new Transform({
    objectMode: true,
    transform(file, enc, callback) {
      if (file.isBuffer() && path.extname(file.path) === '.html') {
        let contents = file.contents.toString();

        // Встраиваем CSS файлы
        contents = contents.replace(/<link rel="stylesheet" href="([^"]+\.css)">/g, (match, cssPath) => {
          try {
            const fullPath = path.join('docs', cssPath);
            if (fs.existsSync(fullPath)) {
              let cssContent = fs.readFileSync(fullPath, 'utf8');
              return `<style>${cssContent}</style>`;
            }
          } catch (e) {
            console.log(`Ошибка при встраивании CSS: ${cssPath}`);
          }
          return match;
        });

        // Встраиваем JS файлы
        contents = contents.replace(/<script src="([^"]+\.js)"><\/script>/g, (match, jsPath) => {
          try {
            const fullPath = path.join('docs', jsPath);
            if (fs.existsSync(fullPath)) {
              let jsContent = fs.readFileSync(fullPath, 'utf8');
              return `<script>${jsContent}</script>`;
            }
          } catch (e) {
            console.log(`Ошибка при встраивании JS: ${jsPath}`);
          }
          return match;
        });

        file.contents = Buffer.from(contents);
      }
      callback(null, file);
    }
  });
}

// Обработка HTML с встраиванием
function html() {
  return gulp.src('docs/*.html')
    .pipe(inlineAssets())
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
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
