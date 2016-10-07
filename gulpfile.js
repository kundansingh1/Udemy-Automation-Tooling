/*eslint-env node */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var eslint = require('gulp-eslint');
var browserSync = require('browser-sync').create();

gulp.task('default', ['styles', 'lint'], function () {
	console.log('gulp running successfully');
	gulp.watch('sass/**/*.scss', ['styles']);
	gulp.watch('js/**/*.js', ['lint']);

	browserSync.init({
		server: './'
	});
});

gulp.task('styles', function () {
	gulp.src('sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('./css'));
});

gulp.task('lint', function () {
	return gulp.src(['**/*.js', '!node_modules/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});
browserSync.stream();