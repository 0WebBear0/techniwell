const { src, dest, parallel, watch } = require('gulp')

const scss = require('gulp-sass')(require('sass'))
const concat = require('gulp-concat')
const browserSync = require('browser-sync').create()
const fileInclude = require('gulp-file-include')

const sourceFiles = 'app'


function styles() {
    return src('app/scss/style.scss')
        .pipe(scss({ outputStyle: 'expanded' }))
        .pipe(concat('style.min.css'))
        .pipe(dest(sourceFiles+'/css'))
        .pipe(browserSync.stream())
}


function browserSyncF() {
    browserSync.init({
        server: {
            baseDir: "app/",
        },
    })
}

function html() {
    return src(sourceFiles+'/pages/*.html')
        .pipe(fileInclude())
        .pipe(dest(sourceFiles+'/'))
        .pipe(browserSync.stream())
}

function watching() {
    watch(['app/scss/**/*.scss'], styles)
    watch(['app/pages/*.html'], html, browserSync.reload)
    watch(['app/components/**/*.html'], html, browserSync.reload)
}

exports.default = parallel(styles, html, browserSyncF, watching)

