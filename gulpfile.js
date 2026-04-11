var gulp = require('gulp');

const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const copy = require('gulp-copy');
let isProd = false; // dev by default
const browserSync = require('browser-sync').create();
const jsFiles = [
  './docs/js/fotorama464.js',
  './docs/js/jquery341.min.js',
  './docs/js/slick.min.js',
  './docs/js/main.js',
]
 
var paths = {
  css: {
    docs: 'docs/css/**/*.css',
    dest: 'dist/css/'
  },
  js: {
    docs: 'docs/js/**/*.js',
    dest: 'dist/js/'
  }
 
};

 const clean = () => {
	return del(['dist/*'])
}

 function html() {
   return gulp.src('docs/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}
 function copyfolder() {
    return gulp.src([ 'docs/fonts/**/*', 'docs/js/jquery.js', 'docs/css/fotorama464.min.css'] ) 
    .pipe(copy('dist', {prefix: 1} ))
    
}




function img() {
  return gulp.src('docs/img/**/*')
		   .pipe(imagemin({
      verbose: true
    })
	
)
		.pipe(gulp.dest('dist/img'))
}
function styles() {
  return gulp.src('docs/css/**/*.css')
    .pipe(autoprefixer({
			cascade: false
		}))
    .pipe(cleanCSS())
    
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.css.dest))
    .pipe(browserSync.stream());
}
 
function scripts() {
  return gulp.src(jsFiles, { sourcemaps: true })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browserSync.stream());
}


 
function watch() {
   browserSync.init({
    server: {
      baseDir: "./dist"
    },
  });
  gulp.watch(paths.js.docs, scripts);
  gulp.watch(paths.css.docs, styles);
}
 
/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.series(clean, html, gulp.parallel(copyfolder, styles, scripts, img), watch);
 
/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.autoprefixer = autoprefixer;
exports.clean = clean;
exports.html = html;
exports.copyfolder = copyfolder;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
exports.default = build;
exports.img = img;