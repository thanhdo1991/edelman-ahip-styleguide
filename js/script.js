/*jslint browser: true*/
/*global $, jQuery, Modernizr, enquire*/
(function (window, document, $) {
  var $html = $('html'),
    mobileOnly = "screen and (max-width:47.9375em)", // 767px.
    mobileLandscape = "(min-width:30em)", // 480px.
    tablet = "(min-width:48em)"; // 768px.
  // Add  functionality here.

  /**
   * Menu Responsive.
   */
  function MenuToggle() {
    var window_width = $(window).outerWidth(true);
    $('.branding-bottom').css({'left': window_width});

    $('body').addClass('hide-menu');
    $('.navbar-toggle').click(function() {
      $(this).toggleClass('active');
      $('body').toggleClass('show-menu');
      $('body').toggleClass('hide-menu');
      $('body').css({'transition': 'left 0.5s'});
    });

    var caret = $('li.has-submenu > .caret');
    caret.click(function(){
      $(this).toggleClass('active');
      $(this).next('ul.submenu').slideToggle();
    });
  }

  /**
   * Menu Responsive.
   */
  function MenuResponsive() {
    var window_width = $(window).outerWidth(true);
    var width_menu = window_width - 86;

    $('.branding-bottom').outerWidth(width_menu);
    if ($('body').hasClass('hide-menu')) {
      $('.branding-bottom').css({'left': window_width, 'transition': 'all 0s'});
    }

    $('body.show-menu').css({'left': - width_menu, 'transition': 'all 0s'});

    $('.navbar-toggle').click(function() {
      $('body.show-menu').css({'left': - width_menu});
      if ($('body').hasClass('show-menu')) {
        $('.branding-bottom').css({'left': 86, 'transition': 'left 0.5s'});
      } else {
        $('.branding-bottom').css({'left': window_width});
      }
    });
  }

  $(document).ready(function () {
    MenuToggle();
    MenuResponsive();

    $(window).resize(function() {
      MenuResponsive();
    });
  });

}(this, this.document, this.jQuery));
