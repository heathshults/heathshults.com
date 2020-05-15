/*!
 * HeathShults.com - Heath Shults v1.0 (http://heathshults.com)
 * Copyright 2020-2020 Heath-Shults
 * Licensed under MIT (https://github.com/heathshults/heathshults.com/LICENSE)
 */

// import * as jQuery from "../vendor/jquery/jquery";

(function($) {
  'use strict'; // Start of use strict
  
  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $('a.js-page-scroll').bind('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
          scrollTop: ($($anchor.attr('href')).offset().top - 5)
      }, 1250, 'easeInOutExpo');
      event.preventDefault();
  });

  // Highlight the top nav as scrolling occurs
  $('body').scrollspy({
      target: '.navbar-fixed-top',
      offset: 50
  });


  // Closes the Responsive Menu on Menu Item Click
  $('.navbar-collapse ul li a').click(function(){ 
          $('.navbar-toggle:visible').click();
  });

  // Offset for Main Navigation
  $('#mainNav').affix({
      offset: {
          top: 50
      }
  })

  var $dm_btn = $('#mode_widget')
  var lsGetMode = localStorage.getItem('dark_mode')
  
  // set button text
  $(document).ready(()=>{
    if (lsGetMode === 'fasle') {
      setModeText(true)
      //$dm_btn.html('<span class="which-mode">Dark Mode<span id="mode_icon" class="fa fa-moon-o mode-icon"></span></span>')
    } else {
      setModeText(false)
      // $dm_btn.html('<span class="which-mode">Light Mode<span id="mode_icon" class="fa fa-sun-o mode-icon"></span></span>')
    }
  })

  async function setModeText(mode) {
    if (mode === true) {
      $dm_btn.html('<span class="which-mode"> Dark Mode<span id="mode_icon" class="fa fa-moon-o mode-icon"></span><span class="tiny-text">Enabled</span></span>') 
    } else {
      $dm_btn.html('<span class="which-mode"> Light Mode<span id="mode_icon" class="fa fa-sun-o mode-icon"></span><span class="tiny-text">Enabled</span></span>')
    }
    
  }
  
  async function setMode(mode) {
        localStorage.setItem('dark_mode', `${mode}`)
        document.querySelector('link[href="css/theme-dark-mode.css"]').disabled = mode;
        setModeText(mode)
    return 
  }

    // Theme switcher 
    $dm_btn.on('click', (event) => {
        event.preventDefault()
        if (localStorage.getItem('dark_mode') === 'true') {
          setMode(false), console.log('set to false')
        } else {
          setMode(true), console.log('set to true')
        } 
        return
    })

    var theBars = document.querySelectorAll('.progress-bar')
      alert(theBars)
      theBars.foreach((bar)=>{
      bar.style.width = bar.getAttribute('aria-valuenow')
    })

    // progress bars
  // var theBars = $('.progress-bar')
  // $.each(theBars, (i, bar)=> {
  //   bar.atr('width') = bar.attr('aria-valuenow')
  // }) 

})(); // End of use strict



