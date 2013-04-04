/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
         banner: '<%= banner %>',
         stripBanners: true
      },
      dist: {
        src: 'app/js/*.js',
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
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },

        files: ['Gruntfile.js', 'app/js/*.js']
    },

    qunit: {
      files: ['test/**/*.html']
    },

      watch:{
          sassfile:{
              files: ['./app/sass/**'],
              dest: 'css_dir',
              tasks: 'compass'
          },

          gruntfile:{
              files: '<%= jshint.files %>',
              tasks:'default'
          }
      },

      compass: {
          src: 'sass',
          forcecompile: true
      }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'compass']);
};
