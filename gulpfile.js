var gulp = require('gulp');
//合并插件
var concat = require('gulp-concat');
//压缩插件
var uglify = require('gulp-uglify');
//删除debug信息
var stripDebug = require('gulp-strip-debug');
//对less文件进行编译
var less = require('gulp-less');
//使用gulp-autoprefixer根据设置浏览器版本自动处理浏览器前缀。使用她我们可以很潇洒地写代码，
//不必考虑各浏览器兼容前缀。【特别是开发移动端页面时，就能充分体现它的优势。例如兼容性不太好的flex布局。】
var autoprefixer = require('gulp-autoprefixer');
//使用gulp-minify-css压缩css文件，减小文件大小，并给引用url添加版本号避免缓存。重要：gulp-minify-css已经被废弃，
//请使用gulp-clean-css，用法一致。
var cssmin=require('gulp-clean-css');



//代码压缩合并
gulp.task('scripts', function() {
  gulp.src(['./src/scripts/*.js'])
    .pipe(concat('all.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./build/scripts/'));
});
//对less进行编译
gulp.task("testless",function(){
	gulp.src('./src/styles/*.less')
	.pipe(less())
	.pipe(gulp.dest('./build/styles'));
})
//浏览器兼容前缀
gulp.task("testAutoFx",function(){
	gulp.src('./styles/*.css')
	.pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
    .pipe(gulp.dest('./build/styles'));
})
gulp.task('default',['testless', 'scripts','testAutoFx'])