module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            less: {
                files: ['assets/css/**/*.less'],
                tasks: ['less']
            },
        },
        less: {
            src: {
                files: [{
                    expand: true,
                    cwd: 'assets/css/less/',
                    src: ['*.less'],
                    dest: 'assets/css/',
                    ext: '.css'
                }]
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);

};