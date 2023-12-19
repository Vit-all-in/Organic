const gulp = require('gulp');
/* Html */
const fileInclude = require('gulp-file-include');
const htmlClean = require('gulp-htmlclean');
const webpHtml = require('gulp-webp-html');
/* Css */
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const sourceMaps = require('gulp-sourcemaps');
const mediaQuery = require('gulp-group-css-media-queries');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const webpCss = require('gulp-webp-css');

const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');

const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imageMin = require('gulp-imagemin');
const webp = require('gulp-webp');
const changed = require('gulp-changed');

gulp.task('clean:docs', (done) => {
   if (fs.existsSync('./docs')) {
      return gulp.src('./docs', {
            read: false
         })
         .pipe(clean());
   }
   done();
});

const fileIncludeSettings = {
   prefix: '@@',
   basepath: '@file'
};

gulp.task('html:docs', () => {
   return gulp.src('./src/html/**/*.html')
      .pipe(changed('./docs'))
      .pipe(plumber(
         notify.onError({
            title: 'HTML',
            message: 'Error: <%= error.message %>',
            sound: 'false'
         })
      ))
      .pipe(webpHtml())
      .pipe(htmlClean())
      .pipe(fileInclude(fileIncludeSettings))
      .pipe(gulp.dest('./docs'));
});

gulp.task('sass:docs', () => {
   return gulp.src('./src/scss/*.scss')
      .pipe(changed('./docs/css'))
      .pipe(plumber(
         notify.onError({
            title: 'SCSS',
            message: 'Error: <%= error.message %>',
            sound: false
         })
      ))
      .pipe(sourceMaps.init())
      .pipe(autoprefixer())
      .pipe(sassGlob())
      .pipe(mediaQuery())
      .pipe(sass())
      .pipe(webpCss()) 
      .pipe(csso())
      .pipe(sourceMaps.write())
      .pipe(gulp.dest('./docs/css'));
});

gulp.task('image:docs', () => {
   return gulp.src('./src/images/**/*')
      .pipe(changed('./docs/img'))
      .pipe(webp())
      .pipe(gulp.dest('./docs/img'))
      
      .pipe(gulp.src('./src/images/**/*')) 
      .pipe(changed('./docs/img'))
      .pipe(imageMin({
         verbose: true
      }))
      .pipe(gulp.dest('./docs/img'));
});

gulp.task('fonts:docs', () => {
   return gulp.src('./src/fonts/**/*')
      .pipe(changed('./docs/fonts'))
      .pipe(gulp.dest('./docs/fonts'));
});

gulp.task('files:docs', () => {
   return gulp.src('./src/files/**/*')
      .pipe(changed('./docs/files'))
      .pipe(gulp.dest('./docs/files'));
});

gulp.task('js:docs', () => {
   return gulp.src('./src/js/**/*')
      .pipe(changed('./docs/js'))
      .pipe(plumber(
         notify.onError({
            title: 'JS',
            message: 'Error: <%= error.message %>',
            sound: 'false'
         })
      ))
      .pipe(uglify())
      .pipe(babel({
         presets: ['@babel/preset-env']
      }))
      .pipe(webpack(require('../webpack.config.js')))
      .pipe(gulp.dest('./docs/js'));
});


const serverOptiions = {
   livereload: true,
   open: true
};

gulp.task('server:docs', () => {
   return gulp.src('./docs').pipe(server(serverOptiions))
});