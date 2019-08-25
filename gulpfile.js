const gulp = require('gulp')
const csso = require('gulp-csso')
const stylus = require('gulp-stylus')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const nib = require('nib')
const autoprefixer = require('autoprefixer-stylus')
const del = require('del')
const concat = require('gulp-concat')

const PATHS = {
  assets: 'src/assets/**/*',
  css: 'src/styles/index.styl',
  dist: 'dist',
  html: 'src/index.html',
  js: 'src/app.js',
  source: 'src',
  vendor: 'src/vendor/**/*',
}

function copyAssets() {
  return gulp.src(PATHS.assets)
    .pipe(gulp.dest(PATHS.dist + '/assets'))
}
function copyHtml() {
  return gulp.src(PATHS.html)
    .pipe(gulp.dest(PATHS.dist))
}
function copyVendor() {
  return gulp.src(PATHS.vendor)
    .pipe(gulp.dest(PATHS.dist + '/vendor'))
}
function clean() {
  return del([PATHS.dist])
}
function styles() {
  return gulp.src(PATHS.css)
    .pipe(stylus({
      paths: [__dirname + '/src/styles'],
      use: [nib(), autoprefixer()]
    }))
    .pipe(rename('styles.min.css'))
    .pipe(csso())
    .pipe(gulp.dest(PATHS.dist))
}
function scripts() {
  return gulp.src(PATHS.js)
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest(PATHS.dist))
}
function ClippyMin() {
  return gulp.src('src/vendor/clippy.js')
    .pipe(uglify())
    .pipe(concat('clippy.min.js'))
    .pipe(gulp.dest(PATHS.dist))
}
function watch() {
  gulp.watch(PATHS.source, build)
}
const copy = gulp.parallel(copyAssets, copyHtml, copyVendor)
const build = gulp.series(clean, copy, gulp.parallel(styles, scripts))

exports.clean = clean
exports.styles = styles
exports.scripts = scripts
exports.watch = watch
exports.build = build
exports.clippyMin = ClippyMin
exports.default = build
