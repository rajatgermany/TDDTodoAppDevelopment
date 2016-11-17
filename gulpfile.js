var gulp = require('gulp')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var ngAnnotate = require('gulp-ng-annotate');


var Src = 'Development/Components/*.js'

gulp.task('Vendor', function(){
    return gulp.src(['Development/lib/angular/angular.js' ,
        'Development/lib/angular-resource/angular-resource.js',


    ])
        .pipe(concat('vendor.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rename('vendor.min.js'))
        .pipe(gulp.dest('Development/'));

})


gulp.task('TodoApp', function(){


    return gulp.src(['Development/Components/TodoApp.js' ,
        'Development/Components/ResourceFactory.js',
        'Development/Components/TodoFactory.js',
        'Development/Components/TodoController.js'

    ])
        .pipe(concat('main.js'))
        .pipe(ngAnnotate())
        .pipe(gulp.dest('Development/'));

})



gulp.task('watch', function(){

    gulp.watch(Src, ['TodoApp'])

})