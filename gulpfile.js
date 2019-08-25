const gulp = require('gulp')
const csso = require('gulp-csso')
const stylus = require('gulp-stylus')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const nib = require('nib')
const autoprefixer = require('autoprefixer-stylus')
const del = require('del')
const concat = require('gulp-concat')

const paths = {
  source: {
    assets: 'src/assets/**/*',
    css: 'src/styles/index.styl',
    html: 'src/index.html',
    js: 'src/app.js',
    vendor: 'src/vendor/**/*',
  },
  dist: 'dist'
}

function copyAssets() {
  return gulp.src(paths.source.assets)
    .pipe(gulp.dest(paths.dist + '/assets'))
}
function copyHtml() {
  return gulp.src(paths.source.html)
    .pipe(gulp.dest(paths.dist))
}
function copyVendor() {
  return gulp.src(paths.source.vendor)
    .pipe(gulp.dest(paths.dist + '/vendor'))
}
function clean() {
  return del([paths.dist])
}
function styles() {
  return gulp.src(paths.source.css)
    .pipe(stylus({
      paths: [__dirname + '/src/styles'],
      use: [nib(), autoprefixer()]
    }))
    .pipe(rename('styles.min.css'))
    .pipe(csso())
    .pipe(gulp.dest(paths.dist))
}
function scripts() {
  return gulp.src(paths.source.js)
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest(paths.dist))
}
function ClippyMin() {
  return gulp.src('src/vendor/clippy.js')
    .pipe(uglify())
    .pipe(concat('clippy.min.js'))
    .pipe(gulp.dest(paths.dist))
}
function watch() {
  gulp.watch(paths.source.css, styles)
  gulp.watch(paths.source.js, scripts)
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
