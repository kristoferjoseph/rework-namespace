/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({

        simplemocha: {
            options: {
                ui: 'bdd',
                reporter: 'nyan'
            },
            all: {
                src: ['test/*.test.js']
            }
        }

  });

  grunt.loadNpmTasks('grunt-simple-mocha');

  // Default task.
  grunt.registerTask('default', ['simplemocha']);

};
