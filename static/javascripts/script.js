(function() {
  var _this = this;

  jQuery(function($) {
    pagr({
      initialPage: routePath
    });
    return $('.pagrlink').click(function() {
      $('.dropdown.open .dropdown-toggle').dropdown('toggle');
      return $('.navbar-collapse').filter('.in').collapse('toggle');
    });
  });

}).call(this);
