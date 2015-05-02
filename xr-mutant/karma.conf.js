// Karma configuration
"use strict";

/* global module */
module.exports = function(config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: 'resources/',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine-ajax', 'jasmine', 'requirejs'],

        // list of files / patterns to load in the browser
        files: [
            'tests/test-main.js',
            'lib/jquery.js',
            'lib/jasmine-jquery.js',

            // Will be made available in JavaScript through global __html__ variable
            'templates/**/*.html',

            {pattern: 'xr/**/*.js', included: false},
            {pattern: 'lib/*.js', included: false},
            {pattern: 'tests/util/**/*.js', included: false},
            {pattern: 'tests/specs/**/*.js', included: false}
        ],

        preprocessors: {
            'templates/**/*.html': ['html2js']
        },

        // test results reporter to use
        reporters: ['progress'],

        // level of logging
        logLevel: config.LOG_INFO,

        // start these browsers
        browsers: ['PhantomJS'],

        singleRun: true,

        autoWatch: false
    });
};
