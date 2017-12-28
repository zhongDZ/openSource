module.exports = function (grunt) {

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    pkg: grunt.file.readJSON('gruntCfg.json'),
    banner: '',
    //清除目录
    clean: {
      all: ['dist/html/**', 'dist/*.*'],
      image: 'dist/html/images',
      css: 'dist/html/css',
      html: 'dist/html/**/*'
    },

    copy: {
      src: {
        files: [
          {expand: true, cwd: 'src', src: ['*.html'], dest: 'dist/html'}
        ]
      },
      image: {
        files: [
          {expand: true, cwd: 'src', src: ['images/*.{png,jpg,jpeg,gif}'], dest: 'dist/html'}
        ]
      }
    },

    // 文件合并
    concat: {
      options: {
        separator: '',//分隔符
        stripBanners: true,//允许添加头部
        //在头部添加 js文件名和时间的注释
        banner: '/*! <%=pkg.name%>-<%=pkg.version%>.js <%=grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      js: {
        src: [
          "src/js/*.js"
        ],
        dest: "dist/html/js/game.min.js"
      },
      css:{
        src: [
          "src/css/*.css"
        ],
        dest: "dist/html/css/game.min.css"
      }
    },

    //压缩JS
    uglify: {
      prod: {
          files: {
            'dist/html/js/game.min.js': ['src/js/*.js', '!src/js/*.min.js']
          }
      }
    },

    //这种方法需要将上一步合并的操作生成文件改成libs.min.js
    // uglify: {
    //   build: {
    //     src: 'dest/libs.min.js',
    //     dest: 'dest/game.min.js'
    //   }
    // },

    //压缩CSS
    cssmin: {
      prod: {
        options: {
          report: 'gzip'
        },
        files: [
          {
            expand: true,
            cwd: 'dist/html',
            src: ['css/*.css'],
            dest: 'dist/html'
          }
        ]
      }
    },

    //压缩图片
    imagemin: {
      prod: {
        options: {
          optimizationLevel: 7,
          pngquant: true
        },
        files: [
          {expand: true, cwd: 'dist/html', src: ['images/*.{png,jpg,jpeg,gif,webp,svg}'], dest: 'dist/html'}
        ]
      }
    },

    rev: {
          options: {

          algorithm: 'sha1',

          length: 4

          },  

          assets: {

              files: [{

                  src: [

                      'dist/html/**/*.{css,jpg,jpeg,gif,png,js}'

                  ]   

              }]  

          }   
    },

    // 处理html中css、js 引入合并问题
    usemin: {
      html: 'dist/html/*.html'
    },

    //压缩HTML
    htmlmin: {
      options: {
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true
      },
      html: {
        files: [
          {expand: true, cwd: 'dist/html', src: ['*.html'], dest: 'dist/html'}
        ]
      }
    }

  });


  grunt.registerTask('prod', [
    'copy',                 //复制文件
    'concat',               //合并文件
    'imagemin',             //图片压缩
    'cssmin',               //CSS压缩
    'uglify',               //JS压缩
    'rev',                  //重置文件名
    'usemin',               //HTML处理
    'htmlmin',              //HTML压缩
  ]);

  grunt.registerTask('build', ['clean', 'prod']);
};
