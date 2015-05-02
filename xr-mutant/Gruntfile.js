"use strict";
/* global module */
module.exports = function(grunt) {

    grunt.initConfig({
        mutationTest: {
            karma: {
                options: {
                    karma: {
                        configFile: 'karma.conf.js',
                        waitForServerTime: 5 // optional, default = 5s
                    },
                    mutationCoverageReporter: {
                        dir: "mutation-coverage/",
                        type: "html"
                    },
                    maxReplacementLength: 0,
                    ignore: [
                        /use strict/,
                        /\brequire\(/,
                        /\.inject\(/
                    ]
                },
                files: {
                    'report.txt': [
                        '{PLACEHOLDER}'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-mutation-testing');

    grunt.registerTask('default', ['mutationTest']);
};
