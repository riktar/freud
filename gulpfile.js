/** GULP **/
let gulp = require('gulp');

/** GESTIONE FILE **/
let rename = require("gulp-rename");
let concat = require('gulp-concat');

/** JAVASCRIPT **/
let uglify = require('gulp-uglify');

/** BROWSERIFY **/
let gulpBrowser = require("gulp-browser");

/** CSS **/
let csso = require('gulp-csso');
let autoprefix = require('gulp-autoprefixer');

/** IMAGES **/
let imagemin = require('gulp-imagemin');

let transforms = [
    {
        transform: "babelify",
        options: {presets: ["env"]}
    }
];

/**
 * Task Immagini
 */
gulp.task('images', function() {
    return gulp.src('dev/img/*')
        //ottimizzo peso immagini
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});


/**
 * Task per gli script
 */
gulp.task('scripts', function () {
    //Cerco tutti i file .js nella cartella dev/js
    gulp.src('dev/js/**/*.js')
        //creo il file concatenato e tradotto da ecma6 a ecma5
        //.pipe(concat('freud.js'))
        .pipe(gulpBrowser.browserify(transforms))
        .pipe(gulp.dest('dist/js'))
        //creo il min
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/js'));
});

/**
 * Task CSS
 */
gulp.task('styles', function () {
    //Cerco tutti i file .css nella cartella dev/css
    gulp.src('dev/css/**/*.css')
        //creo i l file concatenato
        .pipe(autoprefix())
        .pipe(concat('freud.css'))
        .pipe(gulp.dest('dist/css'))
        //creo il min
        .pipe(csso())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});

/**
 * Watcher per auto build al change dei file .js o .css nella cartella dev
 */
gulp.task('default', ['images', 'scripts', 'styles'], function () {
    gulp.watch('dev/img/**/*', ['images']);
    gulp.watch('dev/js/**/*.js', ['scripts']);
    gulp.watch('dev/css/**/*.css', ['styles']);
});