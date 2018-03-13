let del = require('del')
let gulp = require('gulp')
let ts = require('gulp-typescript')
let mocha = require('gulp-mocha')

const tsProject = ts.createProject('tsconfig.json')
const tsResult = tsProject.src()
    .pipe(tsProject())
    .on('error', function () {
        done('TS compile fail')
    })

gulp.task('clean', function () {
    return del(['dist/*'])
})

gulp.task('dts', function () {
    return tsResult.dts.pipe(gulp.dest('dist'))
})

gulp.task('js', function () {
    return tsResult.js.pipe(gulp.dest('dist'))
})

gulp.task('compile', gulp.series('clean', 'js','dts'))

gulp.task('test', gulp.series('compile', function test_func() {
    return gulp.src(['dist/**/**.spec.js'], { read: false })
        .pipe(mocha({
            reporter: 'spec'
        }))
}))