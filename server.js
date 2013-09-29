#!/bin/env node
// Load dependencies
var express = require( 'express' ),
    stylus  = require( 'stylus' ),
    nib     = require( 'nib' ),
    coffee  = require( 'coffee-middleware' );

/**
 *  Define the sample application.
 */
var Site = function()
{
    // Scope.
    var self = this;
    var dev  = process.env.DEV || true;
    var debug = false && dev;

    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function()
    {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP || process.env.IP;
        self.port      = ( process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT ) || 8080;

        if( typeof self.ipaddress === "undefined" )
        {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        }
    };

    /**
     *  Populate the cache.
     */
    self.populateCache = function()
    {
        if( typeof self.zcache === "undefined" )
        {
            self.zcache = { };
        }
    };

    /**
     *  Retrieve entry (content) from cache.
     *  @param {string} key  Key identifying content to retrieve from cache.
     */
    self.cache_get = function( key ) { return self.zcache[ key ]; };
    
    /**
     *  Add entry to cache.
     *  @param {string} key  Key indentifying content to add to cache.
     *  @param {string} val  Value to add to cache.
     */
    self.cache_set = function( key, val ) { self.zcache[ key ] = val; };
    
    /**
     *  Empties stored pages
     */
    self.cache_dump = function() { self.zcache = { }; };

    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function( sig )
    {
        if( typeof sig === "string" )
        {
           console.log( '%s: Received %s - terminating sample app ...',
                       Date( Date.now() ), sig );
           process.exit( 1 );
        }
        console.log( '%s: Node server stopped.', Date( Date.now() ) );
    };

    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function()
    {
        //  Process on exit and signals.
        process.on( 'exit', function() { self.terminator(); } );

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach( function( element, index, array )
        {
            process.on( element, function() { self.terminator(element); } );
        } );
    };

    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    self.buildPage = function( req, res )
    {
        
        // Set header for response
        res.set('Content-Type', 'text/html');
        
        // Try to find page in cache.
        var cachedPage = self.cache_get( req.route.path );
        
        if( dev || typeof cachedPage === "undefined" )
        {
            // Render the page
            self.app.render(
                'index',
                { routePath: req.route.path, dev: dev },
                function( err, html ) {
                    self.cache_set( req.route.path, html );
                    res.send( html );
                }
            );
        }
        else
        {
            // Return cached version
            return res.send( cachedPage );
        }
    };

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function()
    {
        self.routes = { };
        
        // Projects that can be rendered
        var projects = [
            'overview',
            '192',
            'openmusic',
            'glif',
            'storytown',
            'sgpx'
        ];

        // Most routes will use the same page
        self.routes[ '/' ] =
        self.routes[ '/home' ] =
        self.routes[ '/about' ] =
        self.routes[ '/resume' ] =
        self.routes[ '/projects' ] =
        self.routes[ '/blog' ] =
            self.buildPage;
        
        // Add projects
        for( var i = 0; i < projects.length; ++i )
            self.routes[ '/projects/' + projects[ i ] ] = self.buildPage;
    };

    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function()
    {
        self.createRoutes();
        self.app = express();

        //  Add handlers for the app (from the routes).
        for( var r in self.routes )
        {
            self.app.get( r, self.routes[ r ] );
        }
        
        self.app.set( 'views', __dirname + '/views' );
        self.app.set( 'view engine', 'jade' );
        
        if( debug )
            self.app.use( express.logger( 'dev' ) );
        
        //Setup stylus middleware
        self.app.use( stylus.middleware( {
            src:    __dirname + '/',
            dest:   __dirname + '/static',
            force:  dev,
            compile:function( str, path ) {
                return stylus( str )
                    .set( 'filename', path )
                    .use( nib() )
                    .import( 'nib' );
            }
        } ) );
        
        // Setup Coffee-Script middleware
        self.app.use( coffee( {
            src:        __dirname + '/coffeescripts',
            dest:       __dirname + '/static/javascripts',
            prefix:     'javascripts',
            force:      dev,
            debug:      debug,
            once:       !dev,
            compress:   !dev
        } ) );
        
        self.app.use( express.static( __dirname + '/static' ) );
    };

    /**
     *  Initializes the sample application.
     */
    self.initialize = function()
    {
        self.setupVariables();
        self.populateCache();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };

    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function()
    {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        } );
    };
};   /*  Sample Application.  */

var zapp = new Site();
zapp.initialize();
zapp.start();
