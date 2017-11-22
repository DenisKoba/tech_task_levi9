
var gulp = require('gulp');

var sass = require('gulp-sass');

var autoprefixer = require('gulp-autoprefixer');

var useref = require('gulp-useref');

var runSequence = require('run-sequence');


//------------------ CSS ------------------

gulp.task('sass', function(){
    return gulp.src('css/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('css/'));
});


// Watch documents
gulp.task('watch', function(){
    gulp.watch('/css/**/*.css', function() { runSequence('sass')});
});

// ---------------- TASKS ––––––––––––


//Default
gulp.task('default', function(callback){
    runSequence('sass','watch',
        callback
    )
});