const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const sourceMaps = require('gulp-sourcemaps');
const mediaQuery = require('gulp-group-css-media-queries');
const autoprefixer = require('gulp-autoprefixer');
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');

const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const imageMin = require('gulp-imagemin');
const changed = require('gulp-changed');

gulp.task('watch:dev', () => {
   gulp.watch('./src/**/*.html', gulp.series('html:dev'));
   gulp.watch('./src/scss/**/*.scss', gulp.series('sass:dev'));
   gulp.watch('./src/images/**/*', gulp.series('image:dev'));
   gulp.watch('./src/fonts/**/*', gulp.series('fonts:dev'));
   gulp.watch('./src/files/**/*', gulp.series('files:dev'));
   gulp.watch('./src/js/**/*', gulp.series('js:dev'));
})

gulp.task('clean:dev', (done) => {
   if (fs.existsSync('./build')) {
      return gulp.src('./build', {
            read: false
         })
         .pipe(clean());
   }
   done();
})

const fileIncludeSettings = {
   prefix: '@@',
   basepath: '@file'
}

gulp.task('html:dev', () => {
   return gulp.src('./src/html/**/*.html')
      .pipe(changed('./build', {hasChanged: changed.compareContents}))
      .pipe(plumber(
         notify.onError({
            title: 'HTML',
            message: 'Error: <%= error.message %>',
            sound: 'false'
         })
      ))
      .pipe(fileInclude(fileIncludeSettings))
      .pipe(gulp.dest('./build'));
})

gulp.task('sass:dev', () => {
   return gulp.src('./src/scss/*.scss')
      .pipe(changed('./build/css'))
      .pipe(plumber(
         notify.onError({
            title: 'SCSS',
            message: 'Error: <%= error.message %>',
            sound: 'false'
         })
      ))
      .pipe(sourceMaps.init())
      .pipe(autoprefixer())
      .pipe(sassGlob())
      .pipe(sass())
      .pipe(mediaQuery())
      .pipe(sourceMaps.write())
      .pipe(gulp.dest('./build/css'));
})

gulp.task('image:dev', () => {
   return gulp.src('./src/images/**/*')
      .pipe(changed('./build/img'))
      .pipe(imageMin({
         verbose: true
      }))
      .pipe(gulp.dest('./build/img'));
});

gulp.task('fonts:dev', () => {
   return gulp.src('./src/fonts/**/*')
      .pipe(changed('./build/fonts'))
      .pipe(gulp.dest('./build/fonts'));
});

gulp.task('files:dev', () => {
   return gulp.src('./src/files/**/*')
      .pipe(changed('./build/files'))
      .pipe(gulp.dest('./build/files'));
});

gulp.task('js:dev', () => {
   return gulp.src('./src/js/**/*')
      .pipe(changed('./build/js'))
      .pipe(plumber(
         notify.onError({
            title: 'JS',
            message: 'Error: <%= error.message %>',
            sound: 'false'
         })
      ))
      .pipe(babel({
         presets: ['@babel/preset-env']
      }))
      .pipe(webpack(require('../webpack.config.js')))
      .pipe(gulp.dest('./build/js'));
});

const serverOptiions = {
   livereload: true,
   open: true
};

gulp.task('server:dev', () => {
   return gulp.src('./build').pipe(server(serverOptiions))
});