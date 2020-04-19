// Agency Theme JavaScript

(function($) {
    "use strict"; // Start of use strict
    
    $('.ninja-mode-widget').bind('mouseup', function(event) {
      event.preventDefault;
      
      //var $darkmode = $("#darkmode");
      
      $('#ninja').toggleClass('ninja-01 ninja-02')
      
      if($("#darkmode").disabled) {
        
        $("#darkmode").disabled = false;
        localStorage.setItem("darkreader", "enabled");
        
      } else {
        
        $("#darkmode").disabled = true;
        localStorage.setItem("darkreader", "disabled");
        
      }
    })

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    // navigation and darkmode (toggleNinjaMode)
    $('a.page-scroll').bind('click', function(event) {
      event.preventDefault
      var $anchor = $(event.target);
        $('html, body').stop().animate({
          scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
        return 
      
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

})(jQuery); // End of use strict
