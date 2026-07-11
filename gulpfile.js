// const gulp = require('gulp');
// const imagemin = require('gulp-imagemin');
// const htmlmin = require('gulp-htmlmin');
// const del = require('del');
// const browserSync = require('browser-sync').create();
// const fs = require('fs');
// const path = require('path');
// const rename = require('gulp-rename');
// const newer = require('gulp-newer');
// const cache = require('gulp-cache');

// // ===== ПРАВИЛЬНОЕ ПОДКЛЮЧЕНИЕ WEBP ДЛЯ V5 =====
// // В gulp-webp@5.x экспортируется функция по умолчанию
// const webp = require('gulp-webp').default;
// // Или так: const webp = require('gulp-webp').default;

// // ===== ОЧИСТКА =====
// const clean = () => del(['dist/*']);

// // ===== ВСТРАИВАНИЕ CSS/JS В HTML =====
// function inlineAssets() {
//   const Transform = require('stream').Transform;

//   return new Transform({
//     objectMode: true,
//     transform(file, enc, callback) {
//       if (file.isBuffer() && path.extname(file.path) === '.html') {
//         let contents = file.contents.toString();

//         contents = contents.replace(/<link rel="stylesheet" href="([^"]+\.css)">/g, (match, cssPath) => {
//           try {
//             const fullPath = path.join('docs', cssPath);
//             if (fs.existsSync(fullPath)) {
//               let cssContent = fs.readFileSync(fullPath, 'utf8');
//               return `<style>${cssContent}</style>`;
//             }
//           } catch (e) {
//             console.log(`Ошибка при встраивании CSS: ${cssPath}`);
//           }
//           return match;
//         });

//         contents = contents.replace(/<script src="([^"]+\.js)"><\/script>/g, (match, jsPath) => {
//           try {
//             const fullPath = path.join('docs', jsPath);
//             if (fs.existsSync(fullPath)) {
//               let jsContent = fs.readFileSync(fullPath, 'utf8');
//               return `<script>${jsContent}</script>`;
//             }
//           } catch (e) {
//             console.log(`Ошибка при встраивании JS: ${jsPath}`);
//           }
//           return match;
//         });

//         file.contents = Buffer.from(contents);
//       }
//       callback(null, file);
//     }
//   });
// }

// // ===== HTML =====
// function html() {
//   return gulp.src('docs/*.html')
//     .pipe(inlineAssets())
//     .pipe(htmlmin({
//       collapseWhitespace: true,
//       removeComments: true
//     }))
//     .pipe(gulp.dest('dist'))
//     .pipe(browserSync.stream());
// }

// // ===== ШРИФТЫ =====
// function fonts() {
//   return gulp.src('docs/fonts/**/*')
//     .pipe(gulp.dest('dist/fonts'));
// }

// // ===== ИЗОБРАЖЕНИЯ (ТОЛЬКО ОПТИМИЗАЦИЯ) =====
// function img() {
//   return gulp.src('docs/img/**/*.{jpg,jpeg,png,svg,gif,ico}')
//     .pipe(newer('dist/img'))
//     .pipe(cache(imagemin([
//       imagemin.mozjpeg({ quality: 75, progressive: true }),
//       imagemin.optipng({ optimizationLevel: 5 }),
//       imagemin.svgo({ plugins: [{ removeViewBox: false }] }),
//       imagemin.gifsicle({ interlaced: true })
//     ])))
//     .pipe(gulp.dest('dist/img'));
// }

// // ===== КОНВЕРТАЦИЯ В WEBP (ИСПРАВЛЕНО) =====
// function webpImages() {
//   return gulp.src('docs/img/**/*.{jpg,jpeg,png}')
//     .pipe(newer('dist/img'))
//     .pipe(webp({ quality: 75 }))  // ← теперь должно работать
//     .pipe(rename({ extname: '.webp' }))
//     .pipe(gulp.dest('dist/img'));
// }

// // ===== ВСЕ ИЗОБРАЖЕНИЯ (ОПТИМИЗАЦИЯ + WEBP) =====
// function images() {
//   // Оптимизация
//   const optimizeStream = gulp.src('docs/img/**/*.{jpg,jpeg,png,svg,gif,ico}')
//     .pipe(newer('dist/img'))
//     .pipe(cache(imagemin([
//       imagemin.mozjpeg({ quality: 75, progressive: true }),
//       imagemin.optipng({ optimizationLevel: 5 }),
//       imagemin.svgo({ plugins: [{ removeViewBox: false }] }),
//       imagemin.gifsicle({ interlaced: true })
//     ])))
//     .pipe(gulp.dest('dist/img'));

//   // WebP
//   const webpStream = gulp.src('docs/img/**/*.{jpg,jpeg,png}')
//     .pipe(newer('dist/img'))
//     .pipe(webp({ quality: 75 }))
//     .pipe(rename({ extname: '.webp' }))
//     .pipe(gulp.dest('dist/img'));

//   return Promise.all([
//     new Promise((resolve, reject) => {
//       optimizeStream.on('end', resolve);
//       optimizeStream.on('error', reject);
//     }),
//     new Promise((resolve, reject) => {
//       webpStream.on('end', resolve);
//       webpStream.on('error', reject);
//     })
//   ]);
// }

// // ===== WATCH =====
// function watch() {
//   browserSync.init({
//     server: { baseDir: "./dist" }
//   });
//   gulp.watch('docs/**/*.html', html);
//   gulp.watch('docs/css/**/*.css', html);
//   gulp.watch('docs/js/**/*.js', html);
//   gulp.watch('docs/img/**/*', gulp.series(images));
//   gulp.watch('docs/fonts/**/*', fonts);
// }

// // ===== DEPLOY =====
// const ghPages = require('gh-pages');
// gulp.task('deploy', function (cb) {
//   ghPages.publish('dist', cb);
// });

// // ===== ЗАДАЧИ =====
// exports.clean = clean;
// exports.html = html;
// exports.fonts = fonts;
// exports.img = img;
// exports.webp = webpImages;
// exports.images = images;
// exports.watch = watch;
// exports.dev = gulp.series(clean, gulp.parallel(fonts, images, html));
// exports.build = gulp.series(clean, gulp.parallel(fonts, images, html), watch);
// exports.default = exports.build;
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const browserSync = require('browser-sync').create();
const fs = require('fs');
const path = require('path');
const rename = require('gulp-rename');
const newer = require('gulp-newer');
const cache = require('gulp-cache');
const webp = require('gulp-webp').default;

// ===== ОЧИСТКА =====
const clean = () => del(['dist/*']);

// ===== ВСТРАИВАНИЕ CSS/JS В HTML =====
function inlineAssets() {
  const Transform = require('stream').Transform;

  return new Transform({
    objectMode: true,
    transform(file, enc, callback) {
      if (file.isBuffer() && path.extname(file.path) === '.html') {
        let contents = file.contents.toString();

        // Встраиваем CSS
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

        // Встраиваем JS
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

// ===== ОБРАБОТКА HTML =====
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

// ===== ШРИФТЫ =====
function fonts() {
  return gulp.src('docs/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
}

// ===== ИЗОБРАЖЕНИЯ (ОПТИМИЗАЦИЯ) =====
function img() {
  return gulp.src('docs/img/**/*.{jpg,jpeg,png,svg,gif,ico}')
    .pipe(newer('dist/img'))
    .pipe(cache(imagemin([
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({ plugins: [{ removeViewBox: false }] }),
      imagemin.gifsicle({ interlaced: true })
    ])))
    .pipe(gulp.dest('dist/img'));
}

// ===== КОНВЕРТАЦИЯ В WEBP =====
function webpImages() {
  return gulp.src('docs/img/**/*.{jpg,jpeg,png}')
    .pipe(newer('dist/img'))
    .pipe(webp({ quality: 75 }))
    .pipe(rename({ extname: '.webp' }))
    .pipe(gulp.dest('dist/img'));
}

// ===== ВСЕ ИЗОБРАЖЕНИЯ (ОПТИМИЗАЦИЯ + WEBP) =====
function images() {
  console.log('🔄 Начинаем оптимизацию изображений...');

  const optimizeStream = gulp.src('docs/img/**/*.{jpg,jpeg,png,svg,gif,ico}')
    .pipe(newer('dist/img'))
    .pipe(cache(imagemin([
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({ plugins: [{ removeViewBox: false }] }),
      imagemin.gifsicle({ interlaced: true })
    ])))
    .pipe(gulp.dest('dist/img'));

  const webpStream = gulp.src('docs/img/**/*.{jpg,jpeg,png}')
    .pipe(newer('dist/img'))
    .pipe(webp({ quality: 75 }))
    .pipe(rename({ extname: '.webp' }))
    .pipe(gulp.dest('dist/img'));

  return Promise.all([
    new Promise((resolve, reject) => {
      optimizeStream.on('end', () => {
        console.log('✅ Оптимизация JPG/PNG завершена!');
        resolve();
      });
      optimizeStream.on('error', reject);
    }),
    new Promise((resolve, reject) => {
      webpStream.on('end', () => {
        console.log('✅ Конвертация в WebP завершена!');
        resolve();
      });
      webpStream.on('error', reject);
    })
  ]);
}

// ===== WATCH =====
function watch() {
  browserSync.init({
    server: { baseDir: "./dist" }
  });
  gulp.watch('docs/**/*.html', html);
  gulp.watch('docs/css/**/*.css', html);
  gulp.watch('docs/js/**/*.js', html);
  gulp.watch('docs/img/**/*', gulp.series(images));
  gulp.watch('docs/fonts/**/*', fonts);
}

// ===== DEPLOY =====
const ghPages = require('gh-pages');
gulp.task('deploy', function (cb) {
  ghPages.publish('dist', cb);
});

// ===== ЗАДАЧИ =====
exports.clean = clean;
exports.html = html;
exports.fonts = fonts;
exports.img = img;
exports.webp = webpImages;
exports.images = images;
exports.watch = watch;
exports.dev = gulp.series(clean, gulp.parallel(fonts, images, html));
exports.build = gulp.series(clean, gulp.parallel(fonts, images, html), watch);
exports.default = exports.build;
