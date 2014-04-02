module.exports = function(grunt) {
 
  grunt.registerTask('watch', [ 'watch' ]);
  grunt.registerTask('concat' , [ 'concat' ]);
  grunt.registerTask('default',[ 'concat' , 'uglify' ]);
 
  grunt.initConfig({
    concat: {
      js: {
        options: {
          separator: '\n;\n'
        },
        src: [
          'src/_intro.js' ,
          'src/_globals.js' ,
          'src/View.js' ,
          'src/EventManager.js' ,
          'src/HypeViewController.js' ,
          'src/_outro.js'
        ],
        dest: 'build/HypeViewController.js'
      },
    },
    uglify: {
      options: {
        mangle: false
      },
      js: {
        files: {
          'build/HypeViewController.min.js': ['build/HypeViewController.js']
        }
      }
    },
    watch: {
      js: {
        files: ['src/*.js'],
        tasks: ['concat:js', 'uglify:js'],
      },
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
 
};
