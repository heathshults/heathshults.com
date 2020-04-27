/*!
 * HeathShults.com - Heath Shults v1.0 (http://heathshults.com)
 * Copyright 2020-2020 Heath-Shults
 * Licensed under MIT (https://github.com/heathshults/heathshults.com/LICENSE)
 */

(function($) {
  'use strict'; // Start of use strict
  
  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $('a.page-scroll').bind('click', function(event) {
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
  $('.navbar-collapse ul li a').click(function(){ 
          $('.navbar-toggle:visible').click();
  });

  // Offset for Main Navigation
  $('#mainNav').affix({
      offset: {
          top: 100
      }
  })
  
  // darkmode - gotta wear shades
  $(document).ready(()=>{
    let whichMode = document.querySelector('.which-mode')
    whichMode.innerHTML = 'Light Mode<span id="ninja" class="fa fa-sun-o mode-icon"></span>'
    let $shades_container = $('.shades-container')

    $('#mode_widget').click(function(event) {
      $shades_container.toggleClass('is-open')
      
      if ($('link[href="/css/theme-dark-mode.css"]').prop('disabled', true)) {

        $('link[href="/css/theme-dark-mode.css"]').prop('disabled', false);
        localStorage.setItem('darkreader', 'enabled');
        whichMode.innerHTML = 'Dark Mode<span id="ninja" class="fa fa-moon-o mode-icon"></span>'
        
      } else if ($('link[href="/css/theme-dark-mode.css"]').prop('disabled', false)){
        $('link[href="/css/theme-dark-mode.css"]').prop('disabled', true);
        localStorage.setItem('darkreader', 'disabled')
      }
      
    });
  })

})(jQuery); // End of use strict
