// Karma configuration
var path = require('path');
var cwd = process.cwd();

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // plugins: [require('karma-webpack'), require('karma-jasmine'), 'karma-spec-reporter'],

    // list of files / patterns to load in the browser
    files: [
      { pattern: 'test.bundle.js', watched: false }
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test.bundle.js': ['webpack']
    },

    webpack: {
      resolve: {
        root: [path.resolve(cwd)],
        modulesDirectories: ['node_modules', 'app', 'app/ts', 'test', '.'],
        extensions: ['', '.ts', '.js', '.css'],
        alias: {
          'app': 'app'
        }
      },
      module: {
        loaders: [
          { test: /\.ts$/, loader: 'ts-loader', exclude: [/node_modules/]}
        ]
      },
      stats: {
        colors: true,
        reasons: true
      },
      watch: true,
      debug: true
    },
   
    webpackServer: {
      noInfo: true
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
