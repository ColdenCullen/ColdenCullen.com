function pagescroller( config )
{
    // Save time, scroll instantly, reload time
    var time = config.scrollTime || 400;
    
    if( config.initialPage !== undefined )
    {
        config.scrollTime = 0;
        scrollToPage( config.initialPage, config );
    }
    
    config.scrollTime = time;
        
    if( config.scrollEase === undefined )
        config.scrollEase = "easeOutQuad";
    
    $( '.scrollerlink' ).click( function( event ) {
        event.preventDefault();
        scrollToPage( $( event.target ).attr( 'href' ), config );
    } );
}

function getElementIndex( element )
{
    var i = 0;
    for( var elem = element; ( elem = elem.previousSibling ) !== null; ++i ) ;
    return i;
}

function scrollToPage( page, config )
{
    // Name of page without proceding slash.
    var pageNames = page.split( '/' ).filter( function( page ) { return page.length > 0; } );
    
    // If no pages, just go to home
    if( pageNames.length === 0 )
        return;
    
    // Add current state to history
    window.history.pushState( page, page, page );
        
    // Page being scrolled to
    var horizPage = $( '[class*="pagecontainer-horiz-"] > .page#' + pageNames[ 0 ] );
    var vertPage = $( '[class*="pagecontainer-vert-"] > .page#' + pageNames[ 0 ] );
    
    var scrollPage, options;
    
    if( horizPage.length )
    {
        scrollPage = horizPage;
        options = {
            left: -( getElementIndex( scrollPage[ 0 ] ) * scrollPage.width() )
        };
    }
    else if( vertPage.length )
    {
        scrollPage = vertPage;
        options = {
            top: -( getElementIndex( scrollPage[ 0 ] ) * scrollPage.height() )
        };
    }
    
    // Scroll to page
    $( scrollPage.parent() ).animate(
        // Scroll container so that current view is selected
        options,
        // Scroll over 400ms
        config.scrollTime,
        // Easing
        config.scrollEase,
        // If page has special scroll, use that.
        function() { 
            console.log( pageNames );
            scrollToPage( pageNames.splice( 1, 1 ).join( '/' ), config );
        }
    );
}