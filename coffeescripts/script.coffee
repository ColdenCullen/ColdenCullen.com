initSemantic = () ->
    # Setup dropdowns
    $( '.ui.dropdown' ).dropdown { on: 'hover', delay: { show: 0, hide: 0 } }
    
    $topbar = $( '.ui.menu.fixed' )
    
    # Setup top bar
    $( 'body' ).css 'padding-top', do $topbar.height + 'px'
    $topbar.css 'margin-top', '-' + do $topbar.height + 'px'

jQuery ($) =>
    
    do $( document ).foundation unless semantic
    
    #console.log "Testing Coffee!"
    
    pagr { initialPage: routePath }
    
    do initSemantic if semantic
