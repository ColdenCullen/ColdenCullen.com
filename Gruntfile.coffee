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
                
        jade:
            index:
                options:
                    data:
                        dev: false
                        routePath: '/'
                files:
                    './static/index.html': './views/index.jade'
            home:
                options:
                    data:
                        dev: false
                        routePath: '/home'
                files:
                    './static/home/index.html': './views/index.jade'
            about:
                options:
                    data:
                        dev: false
                        routePath: '/about'
                files:
                    './static/about/index.html': './views/index.jade'
            resume:
                options:
                    data:
                        dev: false
                        routePath: '/resume'
                files:
                    './static/resume/index.html': './views/index.jade'
            blog:
                options:
                    data:
                        dev: false
                        routePath: '/blog'
                files:
                    './static/blog/index.html': './views/index.jade'
            projects:
                options:
                    data:
                        dev: false
                        routePath: '/projects'
                files:
                    './static/projects/index.html': './views/index.jade'
            projects_overview:
                options:
                    data:
                        dev: false
                        routePath: '/projects/overview'
                files:
                    './static/projects/overview/index.html': './views/index.jade'
            projects_192:
                options:
                    data:
                        dev: false
                        routePath: '/projects/192'
                files:
                    './static/projects/192/index.html': './views/index.jade'
            projects_openmusic:
                options:
                    data:
                        dev: false
                        routePath: '/projects/openmusic'
                files:
                    './static/projects/openmusic/index.html': './views/index.jade'
            projects_glif:
                options:
                    data:
                        dev: false
                        routePath: '/projects/glif'
                files:
                    './static/projects/glif/index.html': './views/index.jade'
            projects_storytown:
                options:
                    data:
                        dev: false
                        routePath: '/projects/storytown'
                files:
                    './static/projects/storytown/index.html': './views/index.jade'
            projects_sgpx:
                options:
                    data:
                        dev: false
                        routePath: '/projects/sgpx'
                files:
                    './static/projects/sgpx/index.html': './views/index.jade'
        
        coffee:
            compile:
                files:
                    'static/javascripts/script.js': 'coffeescripts/*.coffee'
                    
    grunt.registerTask 'default', [ 'stylus:compile', 'coffee:compile', 'jade' ]
    
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-contrib-stylus'
    grunt.loadNpmTasks 'grunt-contrib-coffee'
    grunt.loadNpmTasks 'grunt-contrib-jade'
    