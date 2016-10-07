var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var eslint = require('gulp-eslint');
var browserSync = require('browser-sync').create();

gulp.task('default', ['copy-html', 'copy-images', 'styles', 'lint'], function () {
	console.log('gulp running successfully');
	gulp.watch('sass/**/*.scss', ['styles']);
	gulp.watch('js/**/*.js', ['lint']);
	gulp.watch('./index.html', ['copy-html']);

	browserSync.init({
		server: './dist'
	});
});

gulp.task('copy-html', function() {
	gulp.src('./index.html')
	.pipe(gulp.dest('./dist'));
});

gulp.task('copy-images', function() {
	gulp.src('./img/*')
	.pipe(gulp.dest('/dist/img'));
});

gulp.task('styles', function () {
	gulp.src('sass/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});

gulp.task('lint', function () {
	return gulp.src(['**/*.js', '!node_modules/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});
browserSync.stream();