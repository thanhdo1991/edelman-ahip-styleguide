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

  /**
   * Ended Video.
   */
  function endedVideo(video) {
    ahip_play = '.block-video__play';
    video.find(ahip_play).html("Play video");
  }

  $(document).ready(function () {
    MenuToggle();
    MenuResponsive();

    $(window).resize(function() {
      MenuResponsive();
    });
  });

  // Video.
  var ahip_video = '.block-video__video',
      ahip_playback = '.block-video__icon',
      ahip_play = '.block-video__play',
      videoPlay = 'playing',
      blockVideo = $('.block-video');

  // Listen for playback.
  blockVideo.each(function () {
    var isThis = $(this);
    isThis.find(ahip_playback).click(function(e) {
      e.preventDefault();
      if (isThis.find(ahip_video)[0].paused) {
        isThis.addClass(videoPlay);
        isThis.find(ahip_video)[0].play();
        isThis.find(ahip_play).html("Pause video");
      }
      else {
        isThis.removeClass(videoPlay);
        isThis.find(ahip_video)[0].pause();
        isThis.find(ahip_play).html("Play video");
      }
    });

    // isThis.find(ahip_video)[0].bind('ended', endedVideo(isThis));
    isThis.find(ahip_video)[0].onended = function () {
      isThis.find(ahip_play).html("Play video");
      isThis.removeClass(videoPlay);
    }
  });


}(this, this.document, this.jQuery));
