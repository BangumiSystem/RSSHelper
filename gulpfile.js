const gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    webpack = require('webpack');

const paths = {
    stylus: './src/javascript/routes/**/*.styl',
};

gulp.task('stylus', () => {
    return gulp
        .src(paths.stylus)
        .pipe(stylus())
        .pipe(gulp.dest((file) => file.base));
});

gulp.task('stylus:watch', () =>
    gulp.watch(paths.stylus).on('change', gulp.series('stylus'))
);
gulp.task('webpack', () => webpack(require('./webpack.dev.config')));

gulp.task(
    'default',
    gulp.series('stylus', gulp.parallel('stylus:watch', 'webpack'))
);
