module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            html: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['*.html'],
                    dest: './'
                }]
            }
        },
        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                    'index.html': 'src/index.html',     // 'destination': 'source'
                    'portfolio.html': 'src/portfolio.html',
                    'outdatedBrowser.html': 'src/outdatedBrowser.html'
                }
            }
        },
        uglify: {
            js: {
                files: [{
                    expand: true,
                    cwd: 'src/js',
                    src: ['**/*.js','!jsx/*.js'],
                    dest: './js'
                }]
            }
        },
        csscomb: {
            options:{
                config:"zen.json"
            },
            dynamic_mappings: {
                expand: true,
                cwd: 'src/css/',
                src: ['*.css'],
                dest: './css/',
                ext: '.css'
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'css/style.css': ['css/style.css'],
                    'css/tistory.css': ['css/tistory.css'],
                }
            }
        },
        imagemin: {                          // Task
            dist: {                         // Another target
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'src/images',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: './images'                  // Destination path prefix
                }]
            }
        }
    });

    for (var key in grunt.file.readJSON("package.json").devDependencies) {
        if (key !== "grunt" && key.indexOf("grunt") === 0) grunt.loadNpmTasks(key);
    };

    grunt.registerTask('default', ['htmlmin:dist','csscomb','cssmin']);

};