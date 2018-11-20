const gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    webpack = require('webpack');
const colors = require('colors');

const paths = {
    stylus: './src/javascript/routes/**/style.styl'
};

gulp.task('stylus', () => {
    return gulp
        .src(paths.stylus)
        .pipe(stylus())
        .pipe(gulp.dest((file) => file.base));
});

gulp.task('stylus:watch', () => gulp.watch(paths.stylus).on('change', gulp.series('stylus')));

gulp.task('webpack', (callback) =>
    webpack(require('./webpack.config'), (err, stats) => {
        callback();
        if (err) console.log(err);
    })
);
gulp.task('webpack:dev', () =>
    webpack(require('./webpack.dev.config'), (err, stats) => {
        if (err) console.log(err);
        console.log(
            `[` +
                colors.grey('Webpack') +
                `]` +
                ` Build ` +
                `'${stats.hash}'`.cyan +
                ` after ` +
                `${stats.endTime - stats.startTime}ms`.magenta
        );
    })
);

gulp.task('build', gulp.series('stylus', 'webpack'));

gulp.task('default', gulp.series('stylus', gulp.parallel('stylus:watch', 'webpack:dev')));
