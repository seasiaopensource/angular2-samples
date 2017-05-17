const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const tslint = require('gulp-tslint');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
var modRewrite = require('connect-modrewrite');
var cleanCSS = require('gulp-clean-css');
var webpack = require("webpack");
var gutil = require("gulp-util");
const sysBuilder = require('systemjs-builder');


// clean the contents of the distribution directory
gulp.task('clean', function () {
    return del(['js', 'lib','css','dist/**/*']);
});

// Copy dependencies
gulp.task('copy:libs', ['clean'],  function() {
    gulp.src(['node_modules/rxjs/**/*'])
        .pipe(gulp.dest('dist/lib/js/rxjs'));

    // concatenate non-angular2 libs, shims & systemjs-config
    gulp.src([
        'node_modules/es6-shim/es6-shim.min.js',
        //'node_modules/es6-promise/dist/es6-promise.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        //'node_modules/systemjs/dist/system-polyfills.js',
        'node_modules/systemjs/dist/system.src.js',
        'system.config.js'
    ])
        .pipe(concat('vendors.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/lib/js'))
        .pipe(gulp.dest('lib/js'));

    // copy source maps
    gulp.src([
        'node_modules/es6-shim/es6-shim.map',
        'node_modules/reflect-metadata/Reflect.js.map',
        'node_modules/systemjs/dist/system-polyfills.js.map'
    ]).pipe(gulp.dest('dist/lib/js'));

    gulp.src([
        'node_modules/angulartics2/**/*'
    ]).pipe(gulp.dest('dist/lib/js/angulartics2'));

    gulp.src([
        'node_modules/showdown/dist/showdown.js'
    ]).pipe(gulp.dest('dist/lib/js/showdown'));

    gulp.src([
        'node_modules/ng2-meta/**/*'
    ]).pipe(gulp.dest('dist/lib/js/ng2-meta'));

    gulp.src([
        'node_modules/ng2-pagination/**/*'
    ]).pipe(gulp.dest('dist/lib/js/ng2-pagination'));

    gulp.src([
        'node_modules/angulartics2/**/*'
    ]).pipe(gulp.dest('dist/lib/js/angulartics2'));

    return gulp.src(['node_modules/@angular/**/*'])
        .pipe(gulp.dest('dist/lib/js/@angular'));
});

gulp.task('lint:ts',['copy:libs'], function() {
    return gulp.src('app/**/*.ts')
        .pipe(tslint())
        .pipe(tslint.report('verbose', { emitError: false }));
});

//TypeScript compile
gulp.task('compile:ts', ['lint:ts'], function () {
    return gulp
        .src('app/**/*.ts')
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(uglify())
        .pipe(gulp.dest('dist/app'));
});

// Minify JS bundle
gulp.task('minify:js', ['compile:ts'], function() {
    return gulp
        .src('dist/js/app.min.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));

});

// Generate systemjs-based builds
gulp.task('bundle:js', ['minify:js'], function() {
    var builder = new sysBuilder('dist', './systemjs.config.js');
    return builder.buildStatic('app', 'dist/js/app.min.js')
        .then(function () {
            return del(['dist/js/**/*', '!dist/js/app.min.js']);
        })
        .catch(function(err) {
            console.error('>>> [systemjs-builder] Bundling failed'.bold.green, err);
        });
});

gulp.task('copy:appMinJs', ['bundle:js'], function() {
   return gulp.src('dist/js/app.min.js').pipe(gulp.dest('js/'));
});

// Generate Style File
gulp.task('copy:scss', ['copy:appMinJs'], function() {
    return gulp.src(['app/**/*.scss'], { base : './' })
        .pipe(sass())
        .pipe(concat('styles.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css/'))
        .pipe(gulp.dest('css/'));
});

// Copy Index File
gulp.task('copy:html', ['copy:scss'], function() {
    return gulp.src(['app/**/*.html', 'index.html', '!app/**/*.ts'], { base : './' })
    // .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
});

// Copy Assets
gulp.task('copy:assets', ['copy:html'], function() {
    return gulp.src(['app/images/**/*', 'app/fonts/**/*'], { base : './' })
        .pipe(gulp.dest('dist'))
});

gulp.task('compress:scripts-css',['copy:assets'], function() {
    gulp.src('local/css/*.css')
        .pipe(concat('all.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(gulp.dest('css'));

    return gulp.src('local/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(gulp.dest('js'));
});

gulp.task('browser-sync', ['watch'], function() {
    browserSync.init({
        server: {
            baseDir: "./",
            middleware: [
                modRewrite(['!\\.\\w+$ /index.html [L]'])
            ],
            proxy: {
                proxyReq: [
                    function(proxyReq) {
                        proxyReq.setHeader('Access-Control-Allow-Origin', '*');
                    }
                ]
            }
        },
        port: 9012,


    });
});

gulp.task('watch',['build'], function() {
    gulp.watch('app/**/*.ts', ['build']).on('change', browserSync.reload);
    gulp.watch('app/**/*.html', ['build']).on('change', browserSync.reload);
    gulp.watch('app/**/*.scss', ['build']).on('change', browserSync.reload);
});

// Static Server + watching scss/html files
gulp.task('serve', ['browser-sync'], function() {

});

gulp.task('build', ['compress:scripts-css']);
gulp.task('default', ['build']);