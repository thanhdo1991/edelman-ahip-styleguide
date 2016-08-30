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
    initBgVideo();
    calcHeightHeroVideo();

    $(window).resize(function() {
      MenuResponsive();
      calcHeightHeroVideo();
    });
  });

  $(window).on('scroll', function () {
    calcMenuFixed();
  });

  var initBgVideo = function() {
    heroVideo = $('.block-video');

    if (heroVideo.length) {
      ytHeroVideo = $('iframe', heroVideo);
      videoSrc = ytHeroVideo.attr('src');

      bgVideo = $('.block-video__bg-video', heroVideo);
      playbackVideo = $('.block-video__icon', heroVideo);
      containerHeroVideo = $('.block-video__container', heroVideo);

      addParams = 'controls=1&showinfo=0&rel=0&wmode=transparent';
      if (videoSrc.indexOf('?') > -1) {
        videoSrc = videoSrc + '&' + addParams;
      }
      else {
        videoSrc = videoSrc + '?' + addParams;
      }
      ytHeroVideo.attr('src', videoSrc);

      playbackVideo.on('click', function(e) {
        e.preventDefault();
        addParams = 'controls=1&showinfo=0&rel=0&autoplay=1&wmode=transparent';
        videoSrc = videoSrc + (videoSrc.indexOf('?') ? '&' + addParams : '?' + addParams);
        ytHeroVideo.attr('src', videoSrc);
        containerHeroVideo.addClass('active');
      });

      bgVideo[0].oncanplay = function () {
        heroVideo.addClass('video-ready');
      }
    }
  }

  var calcHeightHeroVideo = function() {
    heroVideo = $('.block-video');
    bgHeroVideo = $('.block-video__bg-video', heroVideo);
    heightVideoHero = heroVideo.outerHeight();
    widthVideoHero = heroVideo.outerWidth();
    bgHeroVideo.css({
      'min-height': heightVideoHero,
      'min-width': widthVideoHero
    });
  }

  var $header = $('.header'),
    $body = $('body'),
    headerPosition = $header.next().offset().top;
  var calcMenuFixed = function() {
    if($body.hasClass('front')) {
      headerHeight = $header.outerHeight(),
      scrollPos = $(window).scrollTop();
      if (scrollPos > headerPosition) {
        $header.addClass('fixed');
        $header.removeClass('navigation-full');
        $body.css('padding-top', headerHeight + 'px');
      } else {
        $header.removeClass('fixed');
        $header.addClass('navigation-full');
        $body.css('padding-top', 0);
      }
    }
  }

  // Video stories.
  var ahip_stories_video = '.block-video-stories__video',
      ahip_stories_playback = '.block-video-stories__icon',
      videoPlay = 'playing',
      blockStoriesVideo = $('.block-video-stories');

  // Listen for playback.
  blockStoriesVideo.each(function () {
    var isThis = $(this);
    isThis.find(ahip_stories_playback).click(function(e) {
      e.preventDefault();
      if (isThis.find(ahip_stories_video)[0].paused) {
        isThis.addClass(videoPlay);
        isThis.find(ahip_stories_video)[0].play();
      }
      else {
        isThis.removeClass(videoPlay);
        isThis.find(ahip_stories_video)[0].pause();
      }
    });

    isThis.find(ahip_stories_video)[0].onended = function () {
      isThis.removeClass(videoPlay);
    }
  });

  $('.stories-select select').chosen({
    'disable_search': true
  });

}(this, this.document, this.jQuery));
