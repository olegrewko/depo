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
// const webp = require('gulp-webp').default;

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

// // ===== ИЗОБРАЖЕНИЯ =====
// function images() {
//   console.log('🔄 Начинаем оптимизацию изображений...');
//   const optimizeStream = gulp.src('docs/img/**/*.{jpg,jpeg,png,svg,gif,ico}')
//     .pipe(newer('dist/img'))
//     .pipe(cache(imagemin([
//       imagemin.mozjpeg({ quality: 75, progressive: true }),
//       imagemin.optipng({ optimizationLevel: 5 }),
//       imagemin.svgo({ plugins: [{ removeViewBox: false }] }),
//       imagemin.gifsicle({ interlaced: true })
//     ])))
//     .pipe(gulp.dest('dist/img'));

//   const webpStream = gulp.src('docs/img/**/*.{jpg,jpeg,png}')
//     .pipe(newer('dist/img'))
//     .pipe(webp({ quality: 75 }))
//     .pipe(rename({ extname: '.webp' }))
//     .pipe(gulp.dest('dist/img'));

//   return Promise.all([
//     new Promise((resolve, reject) => {
//       optimizeStream.on('end', () => {
//         console.log('✅ Оптимизация JPG/PNG завершена!');
//         resolve();
//       });
//       optimizeStream.on('error', reject);
//     }),
//     new Promise((resolve, reject) => {
//       webpStream.on('end', () => {
//         console.log('✅ Конвертация в WebP завершена!');
//         resolve();
//       });
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
// exports.images = images;
// exports.watch = watch;
// exports.dev = gulp.series(clean, gulp.parallel(fonts, images, html));
// exports.build = gulp.series(clean, gulp.parallel(fonts, images, html), watch);
// exports.default = exports.build;
// последний gulpfile******************************************************************
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
// const webp = require('gulp-webp').default;

// // ===== ДОБАВЛЕНО: МИНИФИКАЦИЯ CSS/JS =====
// const cleanCSS = require('gulp-clean-css');
// const uglify = require('gulp-uglify');
// const concat = require('gulp-concat');

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
//       removeComments: true,
//       minifyCSS: true,
//       minifyJS: true
//     }))
//     .pipe(gulp.dest('dist'))
//     .pipe(browserSync.stream());
// }

// // ===== ШРИФТЫ =====
// function fonts() {
//   return gulp.src('docs/fonts/**/*')
//     .pipe(gulp.dest('dist/fonts'));
// }

// // ===== МИНИФИКАЦИЯ CSS (новая задача) =====
// function minifyCSS() {
//   return gulp.src('docs/css/**/*.css')
//     .pipe(cleanCSS({
//       level: 2,
//       format: 'keep-breaks'
//     }))
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(gulp.dest('dist/css'));
// }

// // ===== МИНИФИКАЦИЯ JS (новая задача) =====
// function minifyJS() {
//   return gulp.src('docs/js/**/*.js')
//     .pipe(uglify({
//       compress: {
//         drop_console: true, // Удаляет console.log
//         drop_debugger: true
//       }
//     }))
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(gulp.dest('dist/js'));
// }

// // ===== ИЗОБРАЖЕНИЯ (уже была, добавил минификацию) =====
// function images() {
//   console.log('🔄 Начинаем оптимизацию изображений...');
//   const optimizeStream = gulp.src('docs/img/**/*.{jpg,jpeg,png,svg,gif,ico}')
//     .pipe(newer('dist/img'))
//     .pipe(cache(imagemin([
//       imagemin.mozjpeg({ quality: 75, progressive: true }),
//       imagemin.optipng({ optimizationLevel: 5 }),
//       imagemin.svgo({ plugins: [{ removeViewBox: false }] }),
//       imagemin.gifsicle({ interlaced: true })
//     ])))
//     .pipe(gulp.dest('dist/img'));

//   const webpStream = gulp.src('docs/img/**/*.{jpg,jpeg,png}')
//     .pipe(newer('dist/img'))
//     .pipe(webp({ quality: 75 }))
//     .pipe(rename({ extname: '.webp' }))
//     .pipe(gulp.dest('dist/img'));

//   return Promise.all([
//     new Promise((resolve, reject) => {
//       optimizeStream.on('end', () => {
//         console.log('✅ Оптимизация JPG/PNG завершена!');
//         resolve();
//       });
//       optimizeStream.on('error', reject);
//     }),
//     new Promise((resolve, reject) => {
//       webpStream.on('end', () => {
//         console.log('✅ Конвертация в WebP завершена!');
//         resolve();
//       });
//       webpStream.on('error', reject);
//     })
//   ]);
// }

// // ===== WATCH (следит за изменениями) =====
// function watch() {
//   browserSync.init({
//     server: { baseDir: "./dist" }
//   });
//   gulp.watch('docs/**/*.html', gulp.series(html, minifyCSS, minifyJS));
//   gulp.watch('docs/css/**/*.css', gulp.series(minifyCSS, html));
//   gulp.watch('docs/js/**/*.js', gulp.series(minifyJS, html));
//   gulp.watch('docs/img/**/*', gulp.series(images));
//   gulp.watch('docs/fonts/**/*', fonts);
// }

// // ===== DEPLOY =====
// const ghPages = require('gh-pages');
// gulp.task('deploy', function (cb) {
//   ghPages.publish('dist', cb);
// });

// // ===== БЫСТРАЯ СБОРКА (без watch) =====
// function buildFast() {
//   return gulp.series(clean, gulp.parallel(fonts, images, minifyCSS, minifyJS, html));
// }

// // ===== ЗАДАЧИ =====
// exports.clean = clean;
// exports.html = html;
// exports.fonts = fonts;
// exports.minifyCSS = minifyCSS;
// exports.minifyJS = minifyJS;
// exports.images = images;
// exports.watch = watch;
// exports.dev = gulp.series(clean, gulp.parallel(fonts, images, minifyCSS, minifyJS, html));
// exports.build = gulp.series(clean, gulp.parallel(fonts, images, minifyCSS, minifyJS, html), watch);
// exports.default = exports.build;
// ******************************************************************************3 gulp*******************
// Пока минификация не нужна — просто используйте gulp build или gulp dev.

// Когда будете готовы — раскомментируйте minifyCSS и minifyJS в build и в html.
// **********************************************************************************************************
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

// ===== МИНИФИКАЦИЯ (пока отключена) =====
// const cleanCSS = require('gulp-clean-css');
// const uglify = require('gulp-uglify');

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

// ===== HTML =====
function html() {
  return gulp.src('docs/*.html')
    .pipe(inlineAssets())
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
      // minifyCSS: true,  // ← пока отключено
      // minifyJS: true    // ← пока отключено
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}

// ===== ШРИФТЫ =====
function fonts() {
  return gulp.src('docs/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
}

// ===== ИЗОБРАЖЕНИЯ =====
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

// ===== МИНИФИКАЦИЯ (временно отключена) =====
// function minifyCSS() {
//   return gulp.src('docs/css/**/*.css')
//     .pipe(cleanCSS({ level: 2 }))
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(gulp.dest('dist/css'));
// }

// function minifyJS() {
//   return gulp.src('docs/js/**/*.js')
//     .pipe(uglify({ compress: { drop_console: true } }))
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(gulp.dest('dist/js'));
// }

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
exports.images = images;
exports.watch = watch;

// ===== СБОРКА БЕЗ МИНИФИКАЦИИ =====
exports.dev = gulp.series(clean, gulp.parallel(fonts, images, html), watch);
exports.build = gulp.series(clean, gulp.parallel(fonts, images, html), watch);
exports.default = exports.build;
