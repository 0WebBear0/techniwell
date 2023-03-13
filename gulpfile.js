const { src, dest,parallel,watch}  = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat         = require('gulp-concat');
const browserSync   = require('browser-sync').create();


function concat1() {
    return src(['app/scss/product-information.scss', 'app/scss/style.scss'])
      .pipe(concat({ path: 'app/scss/style.scss'}))
      .pipe(dest('./dist/'));
  };

function styles() {
    return src('app/scss/style.scss')
    .pipe(scss({outputStyle: 'expanded'}))
    .pipe(concat('style.min.css'))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}



function browsersync(){
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}

function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/*.html']).on('change', browserSync.reload);

  }
exports.default = parallel(styles,browsersync,watching)

