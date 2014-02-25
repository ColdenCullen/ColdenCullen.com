(function() {
  var loadPdf, resumeUrl,
    _this = this;

  resumeUrl = '/ColdenCullen-Resume.pdf';

  jQuery(function($) {
    pagr({
      initialPage: routePath
    });
    $('.pagrlink').click(function() {
      $('.dropdown.open .dropdown-toggle').dropdown('toggle');
      return $('.navbar-collapse').filter('.in').collapse('toggle');
    });
    return loadPdf();
  });

  loadPdf = function() {
    return PDFJS.getDocument(resumeUrl).then(function(pdf) {
      return pdf.getPage(1).then(function(page) {
        var canvas, context, renderContext, scale, viewport;
        scale = 1;
        viewport = page.getViewport(scale);
        canvas = document.getElementById('pdfjs-resume');
        context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        return page.render(renderContext);
      });
    });
  };

}).call(this);
