"use strict";

var gulp = require('gulp');

require('./gulp/dev.js');

require('./gulp/docs.js');

gulp.task('default', gulp.series('clean:dev', 'html:dev', 'sass:dev', 'image:dev', 'fonts:dev', 'files:dev', 'js:dev', 'server:dev', 'watch:dev'));
gulp.task('docs', gulp.series('clean:docs', 'html:docs', 'sass:docs', 'image:docs', 'fonts:docs', 'files:docs', 'js:docs', 'server:docs'));
gulp.task('deploy', function () {
  return gulp.src('./build/**/*').pipe(ghPages({
    remoteUrl: 'https://github.com/Vit-all-in/Organic',
    branch: '<branch_name>'
  }));
});