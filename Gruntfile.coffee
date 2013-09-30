module.exports = (grunt) ->
    grunt.initConfig
        pkg: grunt.file.readJSON 'package.json'
        watch:
            stylesheets:
                files: ['stylesheets/*.styl']
                tasks: ['stylus']
            scripts:
                files: ['coffeescripts/*.coffee']
                tasks: ['coffee']
        stylus:
            compile:
                options:
                    paths: ['views']
                    use: [
                        require 'nib'
                    ]
                    import: [
                        'nib'
                    ]
                files:
                    'static/stylesheets/style.css': ['stylesheets/style.styl']
                
        coffee:
            compile:
                files:
                    'static/javascripts/script.js': 'coffeescripts/*.coffee'
    
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-contrib-stylus'
    grunt.loadNpmTasks 'grunt-contrib-coffee'
    