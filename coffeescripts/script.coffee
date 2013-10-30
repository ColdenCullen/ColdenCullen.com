jQuery ($) =>
    
    pagr { initialPage: routePath }
    
    $( '.pagrlink' ).click () ->
        $( '.dropdown.open .dropdown-toggle' ).dropdown 'toggle'
        $( '.navbar-collapse' ).filter( '.in' ).collapse 'toggle'
