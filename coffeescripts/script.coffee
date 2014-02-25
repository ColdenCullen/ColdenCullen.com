resumeUrl = '/ColdenCullen-Resume.pdf'

jQuery ($) =>
    
    # Setup pagr
    pagr { initialPage: routePath }
    
    # Make clicking a link close dropdowns
    $( '.pagrlink' ).click () ->
        $( '.dropdown.open .dropdown-toggle' ).dropdown 'toggle'
        $( '.navbar-collapse' ).filter( '.in' ).collapse 'toggle'
    
    # Setup pdf.js
    do loadPdf
    
loadPdf = () ->
    PDFJS.getDocument( resumeUrl ).then (pdf) ->
        # Using promise to fetch the page
        pdf.getPage( 1 ).then ( page ) ->
            scale = 1
            viewport = page.getViewport scale

            #
            # Prepare canvas using PDF page dimensions
            #
            canvas = document.getElementById 'pdfjs-resume'
            context = canvas.getContext '2d'
            canvas.height = viewport.height
            canvas.width = viewport.width
            #viewport.height = canvas.height
            #viewport.width = canvas.width
            #
            # Render PDF page into canvas context
            #
            renderContext =
                canvasContext: context
                viewport: viewport
            
            page.render( renderContext )
