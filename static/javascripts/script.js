(function() {
  var initSemantic,
    _this = this;

  initSemantic = function() {
    var $topbar;
    $('.ui.dropdown').dropdown({
      on: 'hover',
      delay: {
        show: 0,
        hide: 0
      }
    });
    $topbar = $('.ui.menu.fixed');
    $('body').css('padding-top', $topbar.height() + 'px');
    return $topbar.css('margin-top', '-' + $topbar.height() + 'px');
  };

  jQuery(function($) {
    if (!semantic) {
      $(document).foundation();
    }
    pagr({
      initialPage: routePath
    });
    if (semantic) {
      return initSemantic();
    }
  });

}).call(this);
