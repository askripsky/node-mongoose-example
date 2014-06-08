module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        simplemocha: {
            options: {
                globals: ['expect'],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'tap'
            },
            all: { src: ['test/*.js'] }
        }
    });

    grunt.loadNpmTasks('grunt-simple-mocha');

    grunt.registerTask('default', ['simplemocha']);
};
