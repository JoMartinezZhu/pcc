const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');

gulp.task('mergeJs', () =>
    gulp
        .src([
            'src/static/redactor/redactor.js',
            'src/static/redactor/redactor_plugins.js',
            'src/static/redactor/redactor_zh_cn.js',
            'src/static/AgoraRTCSDK-2.1.1.js',
            'src/static/MathJax.js',
            'src/static/RecordRTC.js',
            'src/static/adapter.js',
            'src/static/mathInput/i18n.js',
            'src/static/katex/katex.js',
            'src/static/mathInput/icu-slim.js',
        ])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('src/static'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('src/static'))
);
