'use strict';

module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    mochaTest: {
      options: {reporter: 'spec', timeout: 10000},
      unit: {
        src: ['test/*.js']
      },
      routes: {
        options: {slow: 300},
        src: ['test/routes/**/*.js']
      }
    },

    env: {
      dev: {
        NODE_ENV: 'development'
      },
      prod: {
        NODE_ENV: 'production'
      },
      test: {
        NODE_ENV: 'test'
      },
      testLocal: {
        NODE_ENV: 'testLocal'
      },
      coverage: {
        NODE_ENV: 'testLocal',
        APP_DIR_FOR_CODE_COVERAGE: '../coverage/instrument/'
      }
    },

    watch: {
      lint: {
        files: '<%= jshint.files.src %>',
        tasks: 'jshint'
      },
      test: {
        files: ['test/unit/*.js'],
        tasks: ['jshint', 'mochaTest:unit']
      }
    }


  });

  // tasks
  grunt.registerTask('server', ['concurrent:target']);
  grunt.registerTask('default', ['env:dev', 'jshint', 'server']);
  grunt.registerTask('test', ['env:test', 'mochaTest:unit', 'mochaTest:routes', 'env:dev']);
  grunt.registerTask('testLocal', ['env:testLocal', 'mochaTest:unit', 'mochaTest:routes', 'env:dev']);
  grunt.registerTask('coverage',
    ['jshint', 'clean', 'copy:configs', 'copy:views', 'env:coverage',
      'instrument', 'mochaTest:unit', 'mochaTest:routes',
      'storeCoverage', 'makeReport']);
};