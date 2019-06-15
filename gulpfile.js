var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	bourbon = require('node-bourbon'),
	ftp = require('vinyl-ftp'),
	notify = require("gulp-notify");
rigger = require('gulp-rigger');
// Скрипты проекта
gulp.task('scripts', function () {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/js/main.js',
	])
		.pipe(concat('main.js'))
		// .pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('browser-sync', function () {
	browserSync.init({
		// proxy: "http://ut.site/modx-2.5.5-pl/manager",
		server: {
			baseDir: "./dist"
		},
		port: 9000,
		open: true,
		notify: false
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

gulp.task('sass', function () {
	return gulp.src('app/sass/**/*.scss')
		.pipe(sass({
			includePaths: bourbon.includePaths
		}).on("error", notify.onError()))
		.pipe(rename({ suffix: '.min', prefix: '' }))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('html', function () {
	return gulp.src('app/*.html')
		.pipe(rigger())
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({ stream: true }));

})



gulp.task('imagemin', function () {
	return gulp.src('app/img/**/*')
		.pipe(cache(imagemin()))
		.pipe(gulp.dest('dist/img'))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('watch', ['sass', 'imagemin', 'html', 'scripts', 'browser-sync'], function () {
	gulp.watch('app/sass/**/*.scss', ['sass']);
	gulp.watch('app/img/**/*', ['imagemin']);
	gulp.watch(['libs/**/*.js', 'app/js/main.js'], ['scripts']);
	gulp.watch('app/**/*.html', ['html'], browserSync.reload);
});

gulp.task('build', ['removedist', 'html', 'imagemin', 'sass', 'scripts'], function () {

	var buildFiles = gulp.src([
		'app/*.html',
		'app/.htaccess',
	]).pipe(gulp.dest('dist'));
	var buildImg = gulp.src([
		'app/img/**/*.html',

	]).pipe(gulp.dest('dist/img'));


	var buildCss = gulp.src([
		'app/css/main.min.css',
	]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'app/js/scripts.min.js',
	]).pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src([
		'app/fonts/**/*',
	]).pipe(gulp.dest('dist/fonts'));

});

gulp.task('deploy', function () {

	var conn = ftp.create({
		host: 'hostname.com',
		user: 'username',
		password: 'userpassword',
		remotePath: '/',
		parallel: 10,
		log: gutil.log
	});

	var globs = [
		'dist/**',
		'dist/.htaccess',
	];
	return gulp.src(globs, { buffer: false })
		.pipe(conn.dest('/path/to/folder/on/server'));

});

gulp.task('removedist', function () { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
