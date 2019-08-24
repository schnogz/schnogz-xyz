var gulp = require('gulp');

var csso = require('gulp-csso');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var nib = require('nib');
var autoprefixer = require('autoprefixer-stylus');

gulp.task('css', function(){
    return gulp.src('src/index.styl')
        .pipe(stylus({
            paths: [__dirname+'/src'],
            use: [
                nib(),
                autoprefixer()
            ]
        }))

        .pipe(rename('style.min.css'))
        .pipe(csso())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('compress', function() {
    return gulp.src('src/bootstrap.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('compress-ms', function() {
    return gulp.src('src/minesweeper.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/minesweeper'));
});

gulp.task('default', function(){});