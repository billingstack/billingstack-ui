'use strict';

var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};


/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
          '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
          ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        clean: {
            target: 'target'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'app/js/{,*/}*.js'
            ]
        },
        // Task configuration.
        /*
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['app/js/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        */
        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: 'target'
            }
        },
        htmlmin: {
            build: {
                files: {
                    'target/index.html' : 'app/index.html'
                }
            }
        },
        usemin: {
            html: 'target/index.html'
        },
        connect: {
            dev: {
                options: {
                    port: 9000,
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, 'app')
                        ];
                    }
                }
            },
            prod: {
                options: {
                    port: 9001,
                    base: 'target',
                    keepalive: true
                }
            }
        },
        open: {
            dev: {
                path: 'http://127.0.0.1:9000/'
            },
            prod: {
                path: 'http://127.0.0.1:9001/'
            }
        },
        watch: {
            dev: {
                options: {
                    livereload: true
                },
                files: [
                    'app/*.html'
                ]
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // build
    grunt.registerTask('default', ['clean', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'htmlmin', 'usemin']);

    // dev
    grunt.registerTask('dev', ['connect:dev', 'open:dev', 'watch']);

    // prod
    grunt.registerTask('prod', ['default', 'connect:prod', 'open:prod']);

};
