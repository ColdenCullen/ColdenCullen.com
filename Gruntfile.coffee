module.exports = (grunt) ->
    grunt.initConfig
        pkg: grunt.file.readJSON './package.json'
        watch:
            stylus:
                files: './stylesheets/*.styl'
                tasks: 'stylus:compile'
            scripts:
                files: './coffeescripts/*.coffee'
                tasks: 'coffee:compile'
                
        stylus:
            compile:
                options:
                    paths: ['./views']
                    use: [
                        require 'nib'
                    ]
                    import: [
                        'nib'
                    ]
                files:
                    './static/stylesheets/style.css': './stylesheets/*.styl'
                
        coffee:
            compile:
                files:
                    'static/javascripts/script.js': 'coffeescripts/*.coffee'
    
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-contrib-stylus'
    grunt.loadNpmTasks 'grunt-contrib-coffee'
    