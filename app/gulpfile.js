'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    csslint = require('gulp-csslint'),
    cssmin = require('gulp-cssmin'),
    less = require('gulp-less'),
    newer = require('gulp-newer'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    size = require('gulp-size'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    imagemin = require('gulp-imagemin'),
    mozjpeg = require('imagemin-mozjpeg'),
    pngquant = require('imagemin-pngquant'),
    vfs = require('vinyl-fs');


/* =====================================================================================================================
 ======================================================== CONFIG ========================================================
 ===================================================================================================================== */
// source
var src = './src/',
    lessSrc = src + 'less/',
    jsSrc = src + 'js/',
    imgSrc = src + 'img/';
var dist = './dist/',
    cssDist = dist + 'css/',
    jsDist = dist + 'js/',
    imgDist = dist + 'img/';
var dev = './dev/',
    cssDev = dev + 'css/',
    jsDev = dev + 'js/',
    imgDev = dev + 'img/';
var libsSrc = "./libs/";
var fonts = "./fonts";

// destination

// other
var lessFilename = 'index.less',
    cssFilename = 'style.css',
    cssFilenameProduction = 'style.min.css',
    jsFilename = 'scripts.js',
    jsFilenameProduction = 'scripts.min.js',
    cssTypes = '{css,less}',
    imgTypes = '{jpg,JPG,png,PNG,svg,SVG}';


var jsFiles = [
    libsSrc + 'jQuery/jquery-2.2.4.js',
    libsSrc + 'Bootstrap/js/transition.js',
    libsSrc + 'Bootstrap/js/modal.js',
    jsSrc + 'masonry.min.js',
    jsSrc + 'rellax.min.js',
    jsSrc + 'owl.carousel.js',
    jsSrc + 'nivo-lightbox.js',
    jsSrc + 'scripts.js'
];

/* =====================================================================================================================
 ============================================= LESS kompilace + SourceMaps ==============================================
 ===================================================================================================================== */
gulp.task('less', function () {
    gutil.log("Compiling LESS");
    return gulp.src(lessSrc + lessFilename)
        .pipe(plumber(function (error) {
            gutil.log(error.message)
            this.emit('end');
        }))
        //.pipe(sourcemaps.init())
        .pipe(less({
            relativeUrls: true
        }))
        .pipe(rename(cssFilename))
        .pipe(autoprefixer({
            overrideBrowserslist: ['Chrome >= 35', 'Firefox >= 38', 'Edge >= 12', 'Explorer >= 9','iOS >= 8', 'Safari >= 8', 'Android 2.3', 'Android >= 4', 'Opera >= 12'],
            cascade: false
        }))
        .pipe(size({
            showFiles: true
        }))
        //.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(cssDev));
});

/* =====================================================================================================================
 ==================================================== CSS minifikace ====================================================
 ===================================================================================================================== */
gulp.task('cssmin', ['less'], function () { // druhy parametr definuje ze cssmin se spusti az se dokonci less kompilace
    return gulp.src(cssDev + cssFilename)
        .pipe(cssmin({
            advanced: true, // advanced optimizations - selector & property merging, reduction, etc.
            aggressiveMerging: false, // aggressive merging of properties
            keepSpecialComments: 0 // * for keeping all (default), 1 for keeping first one only, 0 for removing all
        }))
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(gulp.dest(cssDist))
        .pipe(size({
            showFiles: true
        }));
});

/* =====================================================================================================================
 ======================================================= CSS Lint =======================================================
 ===================================================================================================================== */
gulp.task('csslint', ['less'], function() {
    gulp.src(cssDeist + cssFilename)
        .pipe(csslint({
            "adjoining-classes": false,
            "box-sizing": false,
            "box-model": false,
            "compatible-vendor-prefixes": false,
            "floats": false,
            "font-sizes": false,
            "gradients": false,
            "important": false,
            "known-properties": false,
            "outline-none": false,
            "qualified-headings": false,
            "regex-selectors": false,
            "shorthand": false,
            "text-indent": false,
            "unique-headings": false,
            "universal-selector": false,
            "unqualified-attributes": false
        }))
        .pipe(csslint.reporter());
});

/* =====================================================================================================================
 ====================================================== JS minify =======================================================
 ===================================================================================================================== */
gulp.task('jsconcat', function () {
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsDev))
        .pipe(size({
            showFiles: true
        }));
});

gulp.task('jsuglify', ['jsconcat'], function () {
    return gulp.src(jsDev + 'scripts.js')
        .pipe(uglify({
            comments: "license"
        }))
        .pipe(rename({
            extname: ".min.js"
        }))
        .pipe(gulp.dest(jsDist))
        .pipe(size({
            showFiles: true
        }));
});

/* =====================================================================================================================
 =================================================== Optimize images ====================================================
 ===================================================================================================================== */
gulp.task('imgoptim', function () {
    return gulp.src(imgSrc + '**/*.' + imgTypes)
        .pipe(newer(imgDist))
        .pipe(imagemin({
            svgoPlugins: [
                { sortAttrs: true }, // sort element attributes for epic readability
                { removeViewBox: false }, // remove the viewbox atribute from the SVG
                { removeUselessStrokeAndFill: true },  // remove Useless Strokes and Fills
                { removeEmptyAttrs: true } ,// remove Empty Attributes from the SVG
                { removeDoctype: true }, // remove doctype declaration
                { removeComments: true }, // remove comments
                { removeMetadata: true }, // remove <metadata>
                { removeEmptyText: true }, // remove empty Text elements
                { removeEmptyContainers: true }, // remove empty Container elements
                { minifyStyles: true }, // minify <style> elements content with CSSO
                { convertStyleToAttrs: true }, // convert styles into attributes
                { removeStyleElement: true }, //  remove <style> elements
                { convertColors: true }, // convert colors (from rgb() to #rrggbb, from #rrggbb to #rgb)
                { convertPathData: true }, // convert Path data to relative or absolute whichever is shorter, convert one segment to another, trim useless delimiters, smart rounding and much more
                { removeXMLProcInst: true }, // remove XML processing instructions
                { cleanupIDs: true } // remove unused and minify used IDs
            ],
            multipass: true, // Optimize svg multiple times until it's fully optimized.
            use: [
                pngquant({
                    quality: '85-95', // Min and max are numbers in range 0 (worst) to 100 (perfect), similar to JPEG.
                    speed: 3 // Speed/quality trade-off from 1 (brute-force) to 10 (fastest). Speed 10 has 5% lower quality, but is 8 times faster than the default.
                }),
                mozjpeg({
                    progressive: false,
                    quality: 91
                })
            ]
        }))
        .pipe(gulp.dest(imgDist));
});


/* =====================================================================================================================
 ===================================================== File Watcher =====================================================
 ===================================================================================================================== */
gulp.task('watch-dev', function() {
    gulp.watch('**/*', {cwd: imgSrc}, ['img']);
    console.log("Watching changes @ " + imgSrc + '**/*.' + imgTypes);

    gulp.watch('**/*', {cwd: lessSrc}, ['css-dev']);
    console.log("Watching changes @ " + lessSrc + '**/*.' + cssTypes);

    gulp.watch(jsFiles, ['js-dev']);
    console.log("Watching changes @ JS Files");
});

gulp.task('watch-production', function() {
    gulp.watch('**/*', {cwd: imgSrc}, ['img']);
    console.log("Watching changes @ " + imgSrc + '**/*.' + imgTypes);

    gulp.watch('**/*', {cwd: lessSrc}, ['css-production']);
    console.log("Watching changes @ " + lessSrc + '**/*.' + cssTypes);

    gulp.watch(jsFiles, ['js-production']);
    console.log("Watching changes @ JS Files");
});

/* =====================================================================================================================
 ======================================================== Symlinks =====================================================
 ===================================================================================================================== */

function symlink(sourceDir, destDir, filename) {
    return vfs.src(sourceDir + '/' + filename, {followSymlinks: false})
        .pipe(vfs.symlink('../media' + destDir));
}

function symlinkFolder(sourceDir, destDir) {
    return vfs.src(sourceDir + '/**/*', {followSymlinks: false})
        .pipe(vfs.symlink('../media' + destDir));
}

gulp.task('symlink-css-dev', null, function () {
    return symlink(cssDev, '', cssFilename);
});

gulp.task('symlink-css-production', ['cssmin'], function () {
    return symlink(cssDist, '', cssFilenameProduction);
});

gulp.task('symlink-js-dev', null, function () {
    return symlink(jsDev, '', jsFilename);
});

gulp.task('symlink-js-production', ['jsuglify'], function () {
    return symlink(jsDist, '', jsFilenameProduction);
});

gulp.task('symlink-img', null, function () {
    return symlinkFolder(imgDist, '/img');
});

gulp.task('symlink-fonts', null, function () {
    return symlinkFolder(fonts, '/fonts');
});

/* =====================================================================================================================
 ======================================================== Tasks =========================================================
 ===================================================================================================================== */
gulp.task('img', ['imgoptim'], function () {

});

// development tasks
gulp.task('css-dev', ['less'], function () {

});
gulp.task('js-dev', ['jsconcat'], function () {

});
gulp.task('development', ['css-dev', 'js-dev', 'img', 'watch-dev']);
gulp.task('default', ['development']);

// production tasks
gulp.task('css-production', ['less', 'cssmin', 'symlink-css-production']);
gulp.task('js-production', ['jsconcat', 'jsuglify', 'symlink-js-production']);
gulp.task('production', ['css-production', 'js-production', 'img', 'watch-production', 'symlink-fonts']);

// build tasks
gulp.task('build', ['css-production', 'js-production', 'img', 'symlink-fonts']);

gulp.task('test', ['csslint']);
