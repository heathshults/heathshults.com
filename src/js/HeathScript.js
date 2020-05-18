/*!
 * HeathShults.com - Heath Shults v1.0 (http://heathshults.com)
 * Copyright 2020-2020 Heath-Shults
 * Licensed under MIT (https://github.com/heathshults/heathshults.com/LICENSE)
 */

// import * as jQuery from "../vendor/jquery/jquery";

(function ($) {
  'use strict'; // Start of use strict

  // jQuery for page scrolling feature - requires jQuery Easing plugin
  // ====== RANKING BARS
  var theBars = document.querySelectorAll('.progress-bar')
  theBars.forEach(aBar => {
    var barWidth = $(aBar).attr('aria-valuenow')
    $(aBar).attr('style', `width: ${barWidth}%`);
  });

  // ====== NAV JS ====== //
  $('a.js-page-scroll').bind('click', function (event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top - 50)
    }, 1250, 'easeInOutExpo');
    event.preventDefault();
  });

  // Highlight the top nav as scrolling occurs
  $('body').scrollspy({
    target: '.navbar-fixed-top',
    offset: 51
  });

  // Closes the Responsive Menu on Menu Item Click
  $('.navbar-collapse .navbar-nav .nav__item .nav__link').click(function () {
    $('.navbar-toggle:visible').click();
  });

  // Offset for Main Navigation
  $('#mainNav').affix({
    offset: {
      top: 60
    }
  })

  // ** ====== MODE WIDHET ====== ** //
  var $dm_btn = $('#mode_widget')
  var lsGetMode = localStorage.getItem('dark_mode')

  // set button text
  $(document).ready(() => {
    if (lsGetMode === 'fasle') {
      setModeText(true)
      //$dm_btn.html('<span class="which-mode">Dark Mode<span id="mode_icon" class="fa fa-moon-o mode-icon"></span></span>')
    } else {
      setModeText(false)
      // $dm_btn.html('<span class="which-mode">Light Mode<span id="mode_icon" class="fa fa-sun-o mode-icon"></span></span>')
    }
  })

  function setModeText(mode) {
    if (mode === 'true') {
      $dm_btn.html('<span class="which-mode"> Dark Mode<span id="mode_icon" class="fa fa-moon-o mode-icon"></span><span class="tiny-text">Enabled</span></span>')
    } else {
      $dm_btn.html('<span class="which-mode"> Light Mode<span id="mode_icon" class="fa fa-sun-o mode-icon"></span><span class="tiny-text">Enabled</span></span>')
    }
  }

  function setMode(mode) {
    localStorage.setItem('dark_mode', `${mode}`)
    document.querySelector('#darkmode').disabled = mode;

    if (mode === 'true') {
      document.querySelector('#darkmode').disabled = false;
      $dm_btn.html('<span class="which-mode"> Dark Mode<span id="mode_icon" class="fa fa-moon-o mode-icon"></span><span class="tiny-text">Enabled</span></span>')

      // document.querySelector('link[href="css/theme-dark-mode.css"]').disabled = false;
    } else {
      $dm_btn.html('<span class="which-mode"> Light Mode<span id="mode_icon" class="fa fa-sun-o mode-icon"></span><span class="tiny-text">Enabled</span></span>')
    }
    return setModeText(mode)
  }

  // Theme switcher 
  $dm_btn.bind('click', (event) => {
    event.preventDefault()
    if (localStorage.getItem('dark_mode') === 'true') {
      setMode('false'), console.log('set to false')
    } else {
      setMode('true'), console.log('set to true')
    }
    return
  })

})(); // End of use strict