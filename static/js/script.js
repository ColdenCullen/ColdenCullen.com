$( function($) {
    $(document).foundation();
    
    pagescroller( { initialPage: routePath } );
    
    // Setup link click events
    // $( '.pagelink' ).click( function( event ) {
    //     event.preventDefault();
    //     scrollToPage( $( event.target ).attr( 'href' ) );
    // } );
    
    // Scroll to inital page
    //scrollToPage( routePath );
} );