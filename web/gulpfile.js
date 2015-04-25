var gulp = require('gulp'),
      Config = require('./config.json'),
      color = require('colorful'),
      uglify = require('gulp-uglify'),
      jshint = require('gulp-jshint'),
      concat = require('gulp-concat'),
      rename = require('gulp-rename'),
      replace = require('gulp-replace'),
      gutils = require('gulp-util'),
      minifyCSS = require('gulp-minify-css'),
      header = require('gulp-header'),
      footer = require('gulp-footer');

var fs = require('fs'),
    exec = require('child_process').exec;


var srcPath = 'src/',
      distPath = 'dist/';

var head_comments = [
      '/*\n',
      gutils.date("yyyy-mm-dd hh:mm:ss"),
      '\nAuthor:humanhuang',
      '\nEmail:halfthink@163.com',
      ' \n*/\n',
].join('');


function log(title, content, titleColor, contentColor) {

      titleColor = titleColor || 'cyan';
      contentColor = contentColor || 'green';

      var date = color.magenta_bg('  ') + '[' + gutils.date("yyyy-mm-dd hh:mm:ss") + ']';
      var combo = color.grey(date) + color[titleColor](' [' + title + ']') + ' ' + color[contentColor](content);

      console.log(combo);
}

function logInfo(title, content){
      log(title, content);
}

function logError(errmsg) {
      log('Error', errmsg, 'red');
}

function k_concat(srcPath, comboName, distPath) {

      gulp.src(srcPath)
            .pipe(concat(comboName))
            .pipe(header(head_comments, Config))
            //.pipe(rename(comboNameDebug))
            .pipe(gulp.dest(distPath));
      //logError(distPath + '/' + comboName)
      logInfo('Generate File', distPath + '/' + comboName);
}
function k_uglify_concat(srcPath, comboName, distPath) {
      gulp.src(srcPath)
            .pipe(uglify())
            .pipe(concat(comboName))
            .pipe(header(head_comments, Config))
            .pipe(gulp.dest(distPath));

      logInfo('Generate File', distPath + '/' + comboName);

      if ((/\.[html|htm|css]/).test(comboName)) {
            return;
      }
      var comboName_debug = comboName.replace(/^(.+)(\..+$)/, '$1-debug$2');
      k_concat(srcPath, comboName_debug, distPath);
}


gulp.task('default', ['build_modules', 'build_static']);
gulp.task('build', ['build_modules', 'build_static']);

gulp.task('build_modules', function () {

      var module, allSrcFiles = [];
      for (var i = 0; i < Config.modules.length; i++) {
            module = Config.modules[i];
            var srcFiles = [];
            for (var j = 0; j < module.pack_list.length; j++) {
                  var srcFile = module.src_path + '/' + module.pack_list[j];
                  srcFiles.push(srcFile);
                  if (module.pack_to_libs) {
                        allSrcFiles.push(srcFile);
                  }
            }
            k_uglify_concat(srcFiles, module.dist_name, module.dist_path);
      }

      //all package!
      k_uglify_concat(allSrcFiles, Config.all_pack_name, Config.all_pack_path);
});

gulp.task('clean', function () {
      child = exec('rm -rf ' + Config.dist_path + '/*',
            function (error, stdout, stderr) {
                  logInfo('Clean Path', Config.dist_path + '/*');
            });
});

gulp.task('dev', function () {
      var module;
      for (var i = 0; i < Config.modules.length; i++) {
            module = Config.modules[i];
            if (module.is_dev) {

                  var srcPaths = [];
                  for (var srcCount = 0; srcCount < module.pack_list.length; srcCount++) {
                        srcPaths.push(module.src_path + '/' + module.pack_list[srcCount]);
                  }

                  watch( module.src_path + '/**/*', srcPaths, module.dist_path, module.dist_name);
            }
      }

      function watch(watchPath, srcPath, distPath, distName) {
            gulp.watch([
                  watchPath
            ], function (e) {
                  console.log(color.green('build:[' + srcPath + ' --> ' + distPath + '/' + distName));
                  k_uglify_concat(srcPath, distName, distPath);
            });
      }
});

gulp.task('build_static', function () {

      var module;
      for (var i = 0; i < Config.static_build_path.length; i++) {
            module = Config.static_build_path[i];
            build_html_css(module.src, module.dist);
      }

      function build_html_css(srcPath, distPath) {

            gulp.src([
                  srcPath + '/**/*.html',
                  srcPath + '/**/*.css',
                  srcPath + '/**/*.jpg',
                  srcPath + '/**/*.png'
            ])

                  //替换includeScript
                  .pipe(replace(/<!--includeScript:(.*)-->/img, function (a, b, c) {

                        var head = '\n<!--includeScript:' + b + '-->\n<script>\n',
                              end = '\n</script>\n', rs;

                        try {
                              rs = head + fs.readFileSync(b) + end;
                              return rs;
                        }
                        catch (e) {
                              console.log(e);
                        }
                  }))

                  //替换include内容
                  .pipe(replace(/\/\*include:(.*)\*\//img, function (a, b, c) {
                        var head = '\n\/*include:' + b + ' start*/\n',
                              end = '\n\/*include:' + b + ' end*/\n', rs;
                        try {
                              rs = head + fs.readFileSync(b) + end;
                              return rs;
                        }
                        catch (e) {
                              console.log(e);
                        }
                  }))

                  //替换include内容
                  .pipe(replace(/<!--include:(.*)-->/img, function (a, b, c) {
                        var head = '\n<!--include:' + b + ' start-->\n',
                              end = '\n<!--include:' + b + ' end-->\n', rs;
                        try {
                              rs = head + fs.readFileSync(b) + end;
                              return rs;
                        }
                        catch (e) {
                              console.log(e);
                        }
                  }))
                  .pipe(gulp.dest(distPath));

            logInfo('Generate File Path', distPath + '/*');
      }
});


gulp.task('watch', function () {

      //build_page
      gulp.watch(['src/page/**/*'], function (e) {
            gulp.run('build_static');
      });

      //build_biz
      gulp.watch(['src/common/**/*'], function (e) {
            gulp.run('build_modules');
      });
});
