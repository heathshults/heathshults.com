/*!
 * HeathShults.com - Heath Shults v1.0 (http://heathshults.com)
 * Copyright 2020-2020 Heath-Shults
 * Licensed under MIT (https://github.com/heathshults/heathshults.com/LICENSE)
 */

(function () {
  'use strict'; // Start of use strict

  // ====== RANKING BARS
  var theBars = document.querySelectorAll('.progress-bar')
  theBars.forEach(aBar => {
    // eslint-disable-next-line no-undef
    var barWidth = $(aBar).attr('aria-valuenow')
    $(aBar).attr('style', `width: ${barWidth}%`);
  });

  // ====== NAV JS ====== //
  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $('a.js-page-scroll').bind('click', function (event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top - 0) //I left the - 0 there to remind me about using it if need be
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


   // ====== SHOWMORE ==== //
  // eslint-disable-next-line no-unused-vars
  let ShowMoreSettings = {
    boxHeight: '100vh',
    fbStartColor: 'rgba(0,0,0,.75)',
    fbEndColor: 'rgba(0,0,0,.75)',
    fbBottomBorder: '1px solid #2e2e2e',
    fbInitButtonText: 'Show More',
    fbOpenButtonText: 'Show Less',
    fbButtonPosition: 'center',
    fbButtonBackground: '#151515',
    fbButtonBackgroundHover: '#333333;',
    fbButtonTextColor: '#ffffff',
    fbButtonTextColorHover: '#ffffff',
    fbButtonTextColorFocus: '#FFF',
    fbButtonBorderColor: '#000000',
    fbButtonBorderColorFocus: '#333333',
  }
   
})(); // End of use strict