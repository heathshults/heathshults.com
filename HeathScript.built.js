(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

require('./js/HeathScript.js');

require('./js/show-more-fadebar/show-more.mjs'); // require('./js/jqBootstrapValidation')

},{"./js/HeathScript.js":2,"./js/show-more-fadebar/show-more.mjs":3}],2:[function(require,module,exports){
"use strict";

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

  var theBars = document.querySelectorAll('.progress-bar');
  theBars.forEach(function (aBar) {
    var barWidth = $(aBar).attr('aria-valuenow');
    $(aBar).attr('style', "width: ".concat(barWidth, "%"));
  }); // ====== NAV JS ====== //

  $('a.js-page-scroll').bind('click', function (event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top - 50
    }, 1250, 'easeInOutExpo');
    event.preventDefault();
  }); // Highlight the top nav as scrolling occurs

  $('body').scrollspy({
    target: '.navbar-fixed-top',
    offset: 51
  }); // Closes the Responsive Menu on Menu Item Click

  $('.navbar-collapse .navbar-nav .nav__item .nav__link').click(function () {
    $('.navbar-toggle:visible').click();
  }); // Offset for Main Navigation

  $('#mainNav').affix({
    offset: {
      top: 60
    }
  }); // ** ====== MODE WIDHET ====== ** //

  var $dm_btn = $('#mode_widget');
  var lsGetMode = localStorage.getItem('dark_mode'); // set button text

  $(document).ready(function () {
    if (lsGetMode === 'fasle') {
      setModeText(true); //$dm_btn.html('<span class="which-mode">Dark Mode<span id="mode_icon" class="fa fa-moon-o mode-icon"></span></span>')
    } else {
      setModeText(false); // $dm_btn.html('<span class="which-mode">Light Mode<span id="mode_icon" class="fa fa-sun-o mode-icon"></span></span>')
    }
  });

  function setModeText(mode) {
    if (mode === 'true') {
      $dm_btn.html('<span class="which-mode"> Dark Mode<span id="mode_icon" class="fa fa-moon-o mode-icon"></span><span class="tiny-text">Enabled</span></span>');
    } else {
      $dm_btn.html('<span class="which-mode"> Light Mode<span id="mode_icon" class="fa fa-sun-o mode-icon"></span><span class="tiny-text">Enabled</span></span>');
    }
  }

  function setMode(mode) {
    localStorage.setItem('dark_mode', "".concat(mode));
    document.querySelector('#darkmode').disabled = mode;

    if (mode === 'true') {
      document.querySelector('#darkmode').disabled = false;
      $dm_btn.html('<span class="which-mode"> Dark Mode<span id="mode_icon" class="fa fa-moon-o mode-icon"></span><span class="tiny-text">Enabled</span></span>'); // document.querySelector('link[href="css/theme-dark-mode.css"]').disabled = false;
    } else {
      $dm_btn.html('<span class="which-mode"> Light Mode<span id="mode_icon" class="fa fa-sun-o mode-icon"></span><span class="tiny-text">Enabled</span></span>');
    }

    return setModeText(mode);
  } // Theme switcher 


  $dm_btn.bind('click', function (event) {
    event.preventDefault();

    if (localStorage.getItem('dark_mode') === 'true') {
      setMode('false'), console.log('set to false');
    } else {
      setMode('true'), console.log('set to true');
    }

    return;
  });
})(); // End of use strict

},{}],3:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-disable no-unused-vars */

/* eslint-disable no-console */
var FadeBarCSS = function FadeBarCSS() {}; // document.addEventListener('DOMContentLoaded', FadeBarCSS = () => {


FadeBarCSS = function FadeBarCSS(options) {
  var cssValues = options;
  var fbCSS = "\n    .j-showmore {\n      position: relative;\n      height: ".concat(cssValues.boxHeight, ";\n      overflow: hidden;\n      padding-bottom: 60px;\n      -webkit-transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);\n         -moz-transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);\n           -o-transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);\n              transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);\n\n      -webkit-transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);\n        -moz-transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);\n          -o-transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);\n              transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);\n    }\n    .j-showmore.is-visible {\n      height: 100%;\n      -webkit-transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);\n         -moz-transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);\n           -o-transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);\n              transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);\n\n      -webkit-transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);\n        -moz-transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);\n          -o-transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);\n              transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);\n    }\n    .j-showmore .j-fader {\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      z-index: 100;\n      width: 100%;\n      height: 30px;\n      text-align: center;\n      vertical-align: bottom;\n      cursor: pointer;\n      border-bottom: 5px solid #f2f2f2;\n      background: -moz-linear-gradient(top, ").concat(cssValues.fbStartColor, " 0%, ").concat(cssValues.fbEndColor, " 65%, ").concat(cssValues.fbEndColor, " 75%);\n      background: -webkit-linear-gradient(top, ").concat(cssValues.fbStartColor, " 0%, ").concat(cssValues.fbEndColor, " 65%, ").concat(cssValues.fbEndColor, " 75%);\n      background: linear-gradient(to bottom, ").concat(cssValues.fbStartColor, " 0%, ").concat(cssValues.fbEndColor, " 65%, ").concat(cssValues.fbEndColor, " 75%);\n      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='").concat(cssValues.fbStartColor, "', endColorstr='").concat(cssValues.fbEndColor, "',GradientType=0 );\n    }\n    .c-code-preview .j-fader {\n      border-bottom: 5px solid #f2f2f2;\n      background: -moz-linear-gradient(top, rgba(255, 255, 255, 0.6), #ffffff 60%);\n      background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.6), #ffffff 60%);\n      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.6), #ffffff 60%);\n      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=0 );\n    }\n    .j-showmore .j-fader__button {\n      display: inline-block;\n      cursor: pointer;\n      position: absolute;\n      bottom: -2px;\n      left: 50%;\n      margin: auto;\n      padding: 4px 8px;\n      background-color: ").concat(cssValues.fbButtonBackground, ";\n      border: 1px solid ").concat(cssValues.fbButtonBorderColor, ";\n      border-bottom: 5px solid ").concat(cssValues.fbButtonBorderColor, ";\n      font-size: 1rem;\n      color: ").concat(cssValues.fbButtonTextColor, ";\n      width: 120px;\n      height: 26px;\n      white-space: nowrap;\n      transform: translateX(-50%);\n    }\n    .j-showmore .j-fader__button::before {\n      display: block;\n      position: absolute;\n      left: 50%;\n      top: 50%;\n      z-index: 100;\n      transform: translate(-50%);\n      width: 100%;\n      content: '").concat(cssValues.fbInitButtonText, "';\n      font-size: 1rem;\n    }\n    .j-showmore .j-fader__button.is-visible::before {\n      content: '").concat(cssValues.fbOpenButtonText, "';\n    }\n    .j-showmore .j-fader__button:hover {\n      background-color: ").concat(cssValues.fbButtonBackgroundHover, ";\n      color: ").concat(cssValues.fbButtonTextColorHover, ";\n    }\n    .j-showmore .j-fader__button:focus {\n      outline-color: ").concat(cssValues.fbButtonBorderColorFocus, ";\n      background-color: ").concat(cssValues.fbButtonBorderColorFocus, ";\n      color: ").concat(cssValues.fbButtonTextColorFocus, ";\n      border: 1px solid ").concat(cssValues.fbButtonBorderColorFocus, ";\n      border-bottom: 5px solid ").concat(cssValues.fbButtonBorderColorFocus, ";\n      box-shadow: unset;\n    }\n    .j-showmore .j-fader__button.is-visible {\n      background-color: ").concat(cssValues.fbButtonBorderColorFocus, ";\n      color: ").concat(cssValues.fbButtonTextColorFocus, ";\n      border: 1px solid ").concat(cssValues.fbButtonBorderColorFocus, ";\n      border-bottom: 5px solid ").concat(cssValues.fbButtonBorderColorFocus, ";\n    }\n    .j-showmore .j-fader.is-visible {\n      border-bottom: 5px solid ").concat(cssValues.fbButtonBorderColorFocus, ";\n    }\n    @keyframes slideOpen {\n      from { height: 300px; }\n      to { height: 100%; }\n    }\n    @keyframes slideClosed {\n      from { height: 100%; }\n      to { height: 300px; } \n    }\n  "); // appendCSS(fbCSS)

  return fbCSS;
};

var FadeBar = function FadeBar() {};

document.addEventListener('DOMContentLoaded', FadeBar = function FadeBar() {
  var VERSION = '0.0.1';
  var NAME = 'ShowMore_FadeBar';
  console.log("Now using ".concat(NAME, " version ").concat(VERSION)); // prepare the style tage for some css luvin

  var styleEl = document.createElement('style');
  var headEl = document.head || document.getElementsByTagName('head')[0];
  var options = settings();
  var cssText = FadeBarCSS(options); // console.log(options);

  styleEl.setAttribute('id', 'fbCSS');
  styleEl.textContent = cssText;
  headEl.append(styleEl);

  try {
    var theFaders = Array.prototype.slice.call(document.querySelectorAll('.j-showmore'));
    theFaders.forEach(function (node) {
      var height = node.getboundingclientrect().height;
      alert(height);
      var theContainer = node;
      var theFadeBar = document.createElement('div');
      var theShowMoreButton = document.createElement('button');
      theFadeBar.classList.add('j-fader');
      theShowMoreButton.classList.add('j-fader__button');
      theShowMoreButton.innerText = options.fbInitButtonText;
      theFadeBar.appendChild(theShowMoreButton);
      theContainer.appendChild(theFadeBar);
      theShowMoreButton.addEventListener('click', function (ev) {
        // ev.target.preventDefault()
        ev.target.classList.toggle('is-visible');
        ev.target.parentNode.classList.toggle('is-visible');
        ev.target.closest('.j-showmore').classList.toggle('is-visible');
      }, false);
      theShowMoreButton.addEventListener('mouseout', function (ev) {
        ev.target.blur();
      });
    });
  } catch (err) {
    console.error(err);
  }
}); // module.exports = FadeBar;

function appendCSS(styles) {
  return function () {
    var styleEl = document.createElement('style');
    var headEl = document.head || document.getElementsByTagName('head')[0]; // const cssStyles = css

    styleEl.textContent = styles;
    headEl.appendChild(styleEl);
    styleEl.type = 'text/css';

    if (styleEl.styleSheet) {
      // This is required for IE8 and below.
      styleEl.styleSheet.cssText = styles;
    } else {
      styleEl.appendChild(document.createTextNode(styles));
    }
  };
}

function cs() {
  var allScriptTags = document.querySelector('script#showMoreCS');
}

function defaults() {
  return {
    boxHeight: '300px',
    fbStartColor: 'rgba(0,0,0,.75)',
    fbEndColor: 'rgba(0,0,0,.75)',
    fbBottomBorder: '1px solid #dedede',
    fbInitButtonText: 'Show More',
    fbOpenButtonText: 'Show Less',
    fbButtonPosition: 'center',
    fbButtonBackground: '#f2f2f2',
    fbButtonBackgroundHover: '#f8f8f8;',
    fbButtonTextColor: '#2e2e2e',
    fbButtonTextColorHover: '#2e2e2e',
    fbButtonTextColorFocus: '#FFF',
    fbButtonBorderColor: '#f2f2f2',
    fbButtonBorderColorFocus: '#49aae6',
    fbClassList: 'u-text-center',
    fbBtnClassList: 'c-button c-button-primary u-mx-auto'
  };
}

function settings(opts) {
  var ShowMoreSettings = _typeof(null);

  var fbCon = [];

  if (!ShowMoreSettings) {
    fbCon = defaults();
  } else {
    fbCon = ShowMoreSettings;
  }

  var styles = {
    classBase: 'button-show-more',
    classActive: 'is-fully-opened',
    classFocused: 'is-focused',
    fadebarClassList: 'animate u-text-center',
    fadebarbButtonClassList: 'c-button u-mx-auto'
  };
  var fbActionBtn = {
    showMore: 'Show More',
    showLess: 'Show Less',
    positionX: 'center',
    positionY: 'bottom',
    fbButtonPosition: 'center',
    fbButtonBackground: '#f2f2f2'
  };
  var options = Object.assign(defaults(), styles, fbActionBtn, fbCon); // cssBuilder(options);

  return options;
} // FadeBar()

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvanMvSGVhdGhTY3JpcHQuanMiLCJzcmMvanMvc2hvdy1tb3JlLWZhZGViYXIvc2hvdy1tb3JlLm1qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsT0FBTyxDQUFDLHFCQUFELENBQVA7O0FBQ0EsT0FBTyxDQUFDLHNDQUFELENBQVAsQyxDQUNBOzs7OztBQ0ZBOzs7OztBQU1BO0FBRUEsQ0FBQyxVQUFVLENBQVYsRUFBYTtBQUNaLGVBRFksQ0FDRTtBQUVkO0FBQ0E7O0FBQ0EsTUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGdCQUFULENBQTBCLGVBQTFCLENBQWQ7QUFDQSxFQUFBLE9BQU8sQ0FBQyxPQUFSLENBQWdCLFVBQUEsSUFBSSxFQUFJO0FBQ3RCLFFBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUSxJQUFSLENBQWEsZUFBYixDQUFmO0FBQ0EsSUFBQSxDQUFDLENBQUMsSUFBRCxDQUFELENBQVEsSUFBUixDQUFhLE9BQWIsbUJBQWdDLFFBQWhDO0FBQ0QsR0FIRCxFQU5ZLENBV1o7O0FBQ0EsRUFBQSxDQUFDLENBQUMsa0JBQUQsQ0FBRCxDQUFzQixJQUF0QixDQUEyQixPQUEzQixFQUFvQyxVQUFVLEtBQVYsRUFBaUI7QUFDbkQsUUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUQsQ0FBZjtBQUNBLElBQUEsQ0FBQyxDQUFDLFlBQUQsQ0FBRCxDQUFnQixJQUFoQixHQUF1QixPQUF2QixDQUErQjtBQUM3QixNQUFBLFNBQVMsRUFBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiLENBQUQsQ0FBRCxDQUF3QixNQUF4QixHQUFpQyxHQUFqQyxHQUF1QztBQUR0QixLQUEvQixFQUVHLElBRkgsRUFFUyxlQUZUO0FBR0EsSUFBQSxLQUFLLENBQUMsY0FBTjtBQUNELEdBTkQsRUFaWSxD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QUNEOztBQUVELE1BQU0sTUFBTSxHQUFHO0FBQ2IsSUFBQSxTQUFTLEVBQUUsa0JBREU7QUFFYixJQUFBLFdBQVcsRUFBRSxpQkFGQTtBQUdiLElBQUEsWUFBWSxFQUFFLFlBSEQ7QUFJYixJQUFBLGdCQUFnQixFQUFFLHVCQUpMO0FBS2IsSUFBQSx1QkFBdUIsRUFBRTtBQUxaLEdBQWY7QUFRQSxNQUFNLFdBQVcsR0FBRztBQUNsQixJQUFBLFFBQVEsRUFBRSxXQURRO0FBRWxCLElBQUEsUUFBUSxFQUFFLFdBRlE7QUFHbEIsSUFBQSxTQUFTLEVBQUUsUUFITztBQUlsQixJQUFBLFNBQVMsRUFBRSxRQUpPO0FBTWxCLElBQUEsZ0JBQWdCLEVBQUUsUUFOQTtBQU9sQixJQUFBLGtCQUFrQixFQUFFO0FBUEYsR0FBcEI7QUFVQSxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBUCxDQUFjLFFBQVEsRUFBdEIsRUFBMEIsTUFBMUIsRUFBa0MsV0FBbEMsRUFBK0MsS0FBL0MsQ0FBaEIsQ0EzQnNCLENBNEJ0Qjs7QUFDQSxTQUFPLE9BQVA7QUFDRCxDLENBQ0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJyZXF1aXJlKCcuL2pzL0hlYXRoU2NyaXB0LmpzJylcbnJlcXVpcmUoJy4vanMvc2hvdy1tb3JlLWZhZGViYXIvc2hvdy1tb3JlLm1qcycpXG4vLyByZXF1aXJlKCcuL2pzL2pxQm9vdHN0cmFwVmFsaWRhdGlvbicpXG4iLCIvKiFcbiAqIEhlYXRoU2h1bHRzLmNvbSAtIEhlYXRoIFNodWx0cyB2MS4wIChodHRwOi8vaGVhdGhzaHVsdHMuY29tKVxuICogQ29weXJpZ2h0IDIwMjAtMjAyMCBIZWF0aC1TaHVsdHNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL2hlYXRoc2h1bHRzL2hlYXRoc2h1bHRzLmNvbS9MSUNFTlNFKVxuICovXG5cbi8vIGltcG9ydCAqIGFzIGpRdWVyeSBmcm9tIFwiLi4vdmVuZG9yL2pxdWVyeS9qcXVlcnlcIjtcblxuKGZ1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JzsgLy8gU3RhcnQgb2YgdXNlIHN0cmljdFxuXG4gIC8vIGpRdWVyeSBmb3IgcGFnZSBzY3JvbGxpbmcgZmVhdHVyZSAtIHJlcXVpcmVzIGpRdWVyeSBFYXNpbmcgcGx1Z2luXG4gIC8vID09PT09PSBSQU5LSU5HIEJBUlNcbiAgdmFyIHRoZUJhcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZ3Jlc3MtYmFyJylcbiAgdGhlQmFycy5mb3JFYWNoKGFCYXIgPT4ge1xuICAgIHZhciBiYXJXaWR0aCA9ICQoYUJhcikuYXR0cignYXJpYS12YWx1ZW5vdycpXG4gICAgJChhQmFyKS5hdHRyKCdzdHlsZScsIGB3aWR0aDogJHtiYXJXaWR0aH0lYCk7XG4gIH0pO1xuXG4gIC8vID09PT09PSBOQVYgSlMgPT09PT09IC8vXG4gICQoJ2EuanMtcGFnZS1zY3JvbGwnKS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIHZhciAkYW5jaG9yID0gJCh0aGlzKTtcbiAgICAkKCdodG1sLCBib2R5Jykuc3RvcCgpLmFuaW1hdGUoe1xuICAgICAgc2Nyb2xsVG9wOiAoJCgkYW5jaG9yLmF0dHIoJ2hyZWYnKSkub2Zmc2V0KCkudG9wIC0gNTApXG4gICAgfSwgMTI1MCwgJ2Vhc2VJbk91dEV4cG8nKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9KTtcblxuICAvLyBIaWdobGlnaHQgdGhlIHRvcCBuYXYgYXMgc2Nyb2xsaW5nIG9jY3Vyc1xuICAkKCdib2R5Jykuc2Nyb2xsc3B5KHtcbiAgICB0YXJnZXQ6ICcubmF2YmFyLWZpeGVkLXRvcCcsXG4gICAgb2Zmc2V0OiA1MVxuICB9KTtcblxuICAvLyBDbG9zZXMgdGhlIFJlc3BvbnNpdmUgTWVudSBvbiBNZW51IEl0ZW0gQ2xpY2tcbiAgJCgnLm5hdmJhci1jb2xsYXBzZSAubmF2YmFyLW5hdiAubmF2X19pdGVtIC5uYXZfX2xpbmsnKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJCgnLm5hdmJhci10b2dnbGU6dmlzaWJsZScpLmNsaWNrKCk7XG4gIH0pO1xuXG4gIC8vIE9mZnNldCBmb3IgTWFpbiBOYXZpZ2F0aW9uXG4gICQoJyNtYWluTmF2JykuYWZmaXgoe1xuICAgIG9mZnNldDoge1xuICAgICAgdG9wOiA2MFxuICAgIH1cbiAgfSlcblxuICAvLyAqKiA9PT09PT0gTU9ERSBXSURIRVQgPT09PT09ICoqIC8vXG4gIHZhciAkZG1fYnRuID0gJCgnI21vZGVfd2lkZ2V0JylcbiAgdmFyIGxzR2V0TW9kZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXJrX21vZGUnKVxuXG4gIC8vIHNldCBidXR0b24gdGV4dFxuICAkKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XG4gICAgaWYgKGxzR2V0TW9kZSA9PT0gJ2Zhc2xlJykge1xuICAgICAgc2V0TW9kZVRleHQodHJ1ZSlcbiAgICAgIC8vJGRtX2J0bi5odG1sKCc8c3BhbiBjbGFzcz1cIndoaWNoLW1vZGVcIj5EYXJrIE1vZGU8c3BhbiBpZD1cIm1vZGVfaWNvblwiIGNsYXNzPVwiZmEgZmEtbW9vbi1vIG1vZGUtaWNvblwiPjwvc3Bhbj48L3NwYW4+JylcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0TW9kZVRleHQoZmFsc2UpXG4gICAgICAvLyAkZG1fYnRuLmh0bWwoJzxzcGFuIGNsYXNzPVwid2hpY2gtbW9kZVwiPkxpZ2h0IE1vZGU8c3BhbiBpZD1cIm1vZGVfaWNvblwiIGNsYXNzPVwiZmEgZmEtc3VuLW8gbW9kZS1pY29uXCI+PC9zcGFuPjwvc3Bhbj4nKVxuICAgIH1cbiAgfSlcblxuICBmdW5jdGlvbiBzZXRNb2RlVGV4dChtb2RlKSB7XG4gICAgaWYgKG1vZGUgPT09ICd0cnVlJykge1xuICAgICAgJGRtX2J0bi5odG1sKCc8c3BhbiBjbGFzcz1cIndoaWNoLW1vZGVcIj4gRGFyayBNb2RlPHNwYW4gaWQ9XCJtb2RlX2ljb25cIiBjbGFzcz1cImZhIGZhLW1vb24tbyBtb2RlLWljb25cIj48L3NwYW4+PHNwYW4gY2xhc3M9XCJ0aW55LXRleHRcIj5FbmFibGVkPC9zcGFuPjwvc3Bhbj4nKVxuICAgIH0gZWxzZSB7XG4gICAgICAkZG1fYnRuLmh0bWwoJzxzcGFuIGNsYXNzPVwid2hpY2gtbW9kZVwiPiBMaWdodCBNb2RlPHNwYW4gaWQ9XCJtb2RlX2ljb25cIiBjbGFzcz1cImZhIGZhLXN1bi1vIG1vZGUtaWNvblwiPjwvc3Bhbj48c3BhbiBjbGFzcz1cInRpbnktdGV4dFwiPkVuYWJsZWQ8L3NwYW4+PC9zcGFuPicpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0TW9kZShtb2RlKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RhcmtfbW9kZScsIGAke21vZGV9YClcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGFya21vZGUnKS5kaXNhYmxlZCA9IG1vZGU7XG5cbiAgICBpZiAobW9kZSA9PT0gJ3RydWUnKSB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGFya21vZGUnKS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgJGRtX2J0bi5odG1sKCc8c3BhbiBjbGFzcz1cIndoaWNoLW1vZGVcIj4gRGFyayBNb2RlPHNwYW4gaWQ9XCJtb2RlX2ljb25cIiBjbGFzcz1cImZhIGZhLW1vb24tbyBtb2RlLWljb25cIj48L3NwYW4+PHNwYW4gY2xhc3M9XCJ0aW55LXRleHRcIj5FbmFibGVkPC9zcGFuPjwvc3Bhbj4nKVxuXG4gICAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsaW5rW2hyZWY9XCJjc3MvdGhlbWUtZGFyay1tb2RlLmNzc1wiXScpLmRpc2FibGVkID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgICRkbV9idG4uaHRtbCgnPHNwYW4gY2xhc3M9XCJ3aGljaC1tb2RlXCI+IExpZ2h0IE1vZGU8c3BhbiBpZD1cIm1vZGVfaWNvblwiIGNsYXNzPVwiZmEgZmEtc3VuLW8gbW9kZS1pY29uXCI+PC9zcGFuPjxzcGFuIGNsYXNzPVwidGlueS10ZXh0XCI+RW5hYmxlZDwvc3Bhbj48L3NwYW4+JylcbiAgICB9XG4gICAgcmV0dXJuIHNldE1vZGVUZXh0KG1vZGUpXG4gIH1cblxuICAvLyBUaGVtZSBzd2l0Y2hlciBcbiAgJGRtX2J0bi5iaW5kKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhcmtfbW9kZScpID09PSAndHJ1ZScpIHtcbiAgICAgIHNldE1vZGUoJ2ZhbHNlJyksIGNvbnNvbGUubG9nKCdzZXQgdG8gZmFsc2UnKVxuICAgIH0gZWxzZSB7XG4gICAgICBzZXRNb2RlKCd0cnVlJyksIGNvbnNvbGUubG9nKCdzZXQgdG8gdHJ1ZScpXG4gICAgfVxuICAgIHJldHVyblxuICB9KVxuXG59KSgpOyAvLyBFbmQgb2YgdXNlIHN0cmljdCIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5sZXQgRmFkZUJhckNTUyA9ICgpID0+IHt9O1xuLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIEZhZGVCYXJDU1MgPSAoKSA9PiB7XG5GYWRlQmFyQ1NTID0gKG9wdGlvbnMpID0+IHtcbiAgY29uc3QgY3NzVmFsdWVzID0gb3B0aW9ucztcblxuICBjb25zdCBmYkNTUyA9IGBcbiAgICAuai1zaG93bW9yZSB7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICBoZWlnaHQ6ICR7Y3NzVmFsdWVzLmJveEhlaWdodH07XG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgcGFkZGluZy1ib3R0b206IDYwcHg7XG4gICAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCA1MDBtcyBjdWJpYy1iZXppZXIoMC43NzAsIDAuMDAwLCAwLjE1NSwgMS4wMDApO1xuICAgICAgICAgLW1vei10cmFuc2l0aW9uOiBhbGwgNTAwbXMgY3ViaWMtYmV6aWVyKDAuNzcwLCAwLjAwMCwgMC4xNTUsIDEuMDAwKTtcbiAgICAgICAgICAgLW8tdHJhbnNpdGlvbjogYWxsIDUwMG1zIGN1YmljLWJlemllcigwLjc3MCwgMC4wMDAsIDAuMTU1LCAxLjAwMCk7XG4gICAgICAgICAgICAgIHRyYW5zaXRpb246IGFsbCA1MDBtcyBjdWJpYy1iZXppZXIoMC43NzAsIDAuMDAwLCAwLjE1NSwgMS4wMDApO1xuXG4gICAgICAtd2Via2l0LXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC43NzAsIDAuMDAwLCAwLjE1NSwgMS4wMDApO1xuICAgICAgICAtbW96LXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC43NzAsIDAuMDAwLCAwLjE1NSwgMS4wMDApO1xuICAgICAgICAgIC1vLXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC43NzAsIDAuMDAwLCAwLjE1NSwgMS4wMDApO1xuICAgICAgICAgICAgICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNzcwLCAwLjAwMCwgMC4xNTUsIDEuMDAwKTtcbiAgICB9XG4gICAgLmotc2hvd21vcmUuaXMtdmlzaWJsZSB7XG4gICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCA1MDBtcyBjdWJpYy1iZXppZXIoMC43NzAsIDAuMDAwLCAwLjE1NSwgMS4wMDApO1xuICAgICAgICAgLW1vei10cmFuc2l0aW9uOiBhbGwgNTAwbXMgY3ViaWMtYmV6aWVyKDAuNzcwLCAwLjAwMCwgMC4xNTUsIDEuMDAwKTtcbiAgICAgICAgICAgLW8tdHJhbnNpdGlvbjogYWxsIDUwMG1zIGN1YmljLWJlemllcigwLjc3MCwgMC4wMDAsIDAuMTU1LCAxLjAwMCk7XG4gICAgICAgICAgICAgIHRyYW5zaXRpb246IGFsbCA1MDBtcyBjdWJpYy1iZXppZXIoMC43NzAsIDAuMDAwLCAwLjE1NSwgMS4wMDApO1xuXG4gICAgICAtd2Via2l0LXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC43NzAsIDAuMDAwLCAwLjE1NSwgMS4wMDApO1xuICAgICAgICAtbW96LXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC43NzAsIDAuMDAwLCAwLjE1NSwgMS4wMDApO1xuICAgICAgICAgIC1vLXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC43NzAsIDAuMDAwLCAwLjE1NSwgMS4wMDApO1xuICAgICAgICAgICAgICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogY3ViaWMtYmV6aWVyKDAuNzcwLCAwLjAwMCwgMC4xNTUsIDEuMDAwKTtcbiAgICB9XG4gICAgLmotc2hvd21vcmUgLmotZmFkZXIge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgYm90dG9tOiAwO1xuICAgICAgbGVmdDogMDtcbiAgICAgIHotaW5kZXg6IDEwMDtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgaGVpZ2h0OiAzMHB4O1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgdmVydGljYWwtYWxpZ246IGJvdHRvbTtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCAjZjJmMmYyO1xuICAgICAgYmFja2dyb3VuZDogLW1vei1saW5lYXItZ3JhZGllbnQodG9wLCAke2Nzc1ZhbHVlcy5mYlN0YXJ0Q29sb3J9IDAlLCAke2Nzc1ZhbHVlcy5mYkVuZENvbG9yfSA2NSUsICR7Y3NzVmFsdWVzLmZiRW5kQ29sb3J9IDc1JSk7XG4gICAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCh0b3AsICR7Y3NzVmFsdWVzLmZiU3RhcnRDb2xvcn0gMCUsICR7Y3NzVmFsdWVzLmZiRW5kQ29sb3J9IDY1JSwgJHtjc3NWYWx1ZXMuZmJFbmRDb2xvcn0gNzUlKTtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sICR7Y3NzVmFsdWVzLmZiU3RhcnRDb2xvcn0gMCUsICR7Y3NzVmFsdWVzLmZiRW5kQ29sb3J9IDY1JSwgJHtjc3NWYWx1ZXMuZmJFbmRDb2xvcn0gNzUlKTtcbiAgICAgIGZpbHRlcjogcHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LmdyYWRpZW50KCBzdGFydENvbG9yc3RyPScke2Nzc1ZhbHVlcy5mYlN0YXJ0Q29sb3J9JywgZW5kQ29sb3JzdHI9JyR7Y3NzVmFsdWVzLmZiRW5kQ29sb3J9JyxHcmFkaWVudFR5cGU9MCApO1xuICAgIH1cbiAgICAuYy1jb2RlLXByZXZpZXcgLmotZmFkZXIge1xuICAgICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkICNmMmYyZjI7XG4gICAgICBiYWNrZ3JvdW5kOiAtbW96LWxpbmVhci1ncmFkaWVudCh0b3AsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KSwgI2ZmZmZmZiA2MCUpO1xuICAgICAgYmFja2dyb3VuZDogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQodG9wLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNiksICNmZmZmZmYgNjAlKTtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byBib3R0b20sIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KSwgI2ZmZmZmZiA2MCUpO1xuICAgICAgZmlsdGVyOiBwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuZ3JhZGllbnQoIHN0YXJ0Q29sb3JzdHI9JyMwMGZmZmZmZicsIGVuZENvbG9yc3RyPScjZmZmZmZmJyxHcmFkaWVudFR5cGU9MCApO1xuICAgIH1cbiAgICAuai1zaG93bW9yZSAuai1mYWRlcl9fYnV0dG9uIHtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGJvdHRvbTogLTJweDtcbiAgICAgIGxlZnQ6IDUwJTtcbiAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgIHBhZGRpbmc6IDRweCA4cHg7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2Nzc1ZhbHVlcy5mYkJ1dHRvbkJhY2tncm91bmR9O1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgJHtjc3NWYWx1ZXMuZmJCdXR0b25Cb3JkZXJDb2xvcn07XG4gICAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgJHtjc3NWYWx1ZXMuZmJCdXR0b25Cb3JkZXJDb2xvcn07XG4gICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICBjb2xvcjogJHtjc3NWYWx1ZXMuZmJCdXR0b25UZXh0Q29sb3J9O1xuICAgICAgd2lkdGg6IDEyMHB4O1xuICAgICAgaGVpZ2h0OiAyNnB4O1xuICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgICB9XG4gICAgLmotc2hvd21vcmUgLmotZmFkZXJfX2J1dHRvbjo6YmVmb3JlIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgbGVmdDogNTAlO1xuICAgICAgdG9wOiA1MCU7XG4gICAgICB6LWluZGV4OiAxMDA7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlKTtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgY29udGVudDogJyR7Y3NzVmFsdWVzLmZiSW5pdEJ1dHRvblRleHR9JztcbiAgICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICB9XG4gICAgLmotc2hvd21vcmUgLmotZmFkZXJfX2J1dHRvbi5pcy12aXNpYmxlOjpiZWZvcmUge1xuICAgICAgY29udGVudDogJyR7Y3NzVmFsdWVzLmZiT3BlbkJ1dHRvblRleHR9JztcbiAgICB9XG4gICAgLmotc2hvd21vcmUgLmotZmFkZXJfX2J1dHRvbjpob3ZlciB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke2Nzc1ZhbHVlcy5mYkJ1dHRvbkJhY2tncm91bmRIb3Zlcn07XG4gICAgICBjb2xvcjogJHtjc3NWYWx1ZXMuZmJCdXR0b25UZXh0Q29sb3JIb3Zlcn07XG4gICAgfVxuICAgIC5qLXNob3dtb3JlIC5qLWZhZGVyX19idXR0b246Zm9jdXMge1xuICAgICAgb3V0bGluZS1jb2xvcjogJHtjc3NWYWx1ZXMuZmJCdXR0b25Cb3JkZXJDb2xvckZvY3VzfTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y3NzVmFsdWVzLmZiQnV0dG9uQm9yZGVyQ29sb3JGb2N1c307XG4gICAgICBjb2xvcjogJHtjc3NWYWx1ZXMuZmJCdXR0b25UZXh0Q29sb3JGb2N1c307XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAke2Nzc1ZhbHVlcy5mYkJ1dHRvbkJvcmRlckNvbG9yRm9jdXN9O1xuICAgICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkICR7Y3NzVmFsdWVzLmZiQnV0dG9uQm9yZGVyQ29sb3JGb2N1c307XG4gICAgICBib3gtc2hhZG93OiB1bnNldDtcbiAgICB9XG4gICAgLmotc2hvd21vcmUgLmotZmFkZXJfX2J1dHRvbi5pcy12aXNpYmxlIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICR7Y3NzVmFsdWVzLmZiQnV0dG9uQm9yZGVyQ29sb3JGb2N1c307XG4gICAgICBjb2xvcjogJHtjc3NWYWx1ZXMuZmJCdXR0b25UZXh0Q29sb3JGb2N1c307XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAke2Nzc1ZhbHVlcy5mYkJ1dHRvbkJvcmRlckNvbG9yRm9jdXN9O1xuICAgICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkICR7Y3NzVmFsdWVzLmZiQnV0dG9uQm9yZGVyQ29sb3JGb2N1c307XG4gICAgfVxuICAgIC5qLXNob3dtb3JlIC5qLWZhZGVyLmlzLXZpc2libGUge1xuICAgICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkICR7Y3NzVmFsdWVzLmZiQnV0dG9uQm9yZGVyQ29sb3JGb2N1c307XG4gICAgfVxuICAgIEBrZXlmcmFtZXMgc2xpZGVPcGVuIHtcbiAgICAgIGZyb20geyBoZWlnaHQ6IDMwMHB4OyB9XG4gICAgICB0byB7IGhlaWdodDogMTAwJTsgfVxuICAgIH1cbiAgICBAa2V5ZnJhbWVzIHNsaWRlQ2xvc2VkIHtcbiAgICAgIGZyb20geyBoZWlnaHQ6IDEwMCU7IH1cbiAgICAgIHRvIHsgaGVpZ2h0OiAzMDBweDsgfSBcbiAgICB9XG4gIGA7XG5cbiAgLy8gYXBwZW5kQ1NTKGZiQ1NTKVxuICByZXR1cm4gZmJDU1M7XG59O1xubGV0IEZhZGVCYXIgPSAoKSA9PiB7fTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBGYWRlQmFyID0gKCkgPT4ge1xuICBjb25zdCBWRVJTSU9OID0gJzAuMC4xJztcbiAgY29uc3QgTkFNRSA9ICdTaG93TW9yZV9GYWRlQmFyJztcbiAgY29uc29sZS5sb2coYE5vdyB1c2luZyAke05BTUV9IHZlcnNpb24gJHtWRVJTSU9OfWApO1xuICAvLyBwcmVwYXJlIHRoZSBzdHlsZSB0YWdlIGZvciBzb21lIGNzcyBsdXZpblxuICBjb25zdCBzdHlsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgY29uc3QgaGVhZEVsID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuXG4gIGNvbnN0IG9wdGlvbnMgPSBzZXR0aW5ncygpO1xuICBjb25zdCBjc3NUZXh0ID0gRmFkZUJhckNTUyhvcHRpb25zKTtcbiAgLy8gY29uc29sZS5sb2cob3B0aW9ucyk7XG5cbiAgc3R5bGVFbC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2ZiQ1NTJyk7XG4gIHN0eWxlRWwudGV4dENvbnRlbnQgPSBjc3NUZXh0O1xuICBoZWFkRWwuYXBwZW5kKHN0eWxlRWwpO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgdGhlRmFkZXJzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmotc2hvd21vcmUnKSk7XG5cbiAgICB0aGVGYWRlcnMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgY29uc3QgaGVpZ2h0ID0gbm9kZS5nZXRib3VuZGluZ2NsaWVudHJlY3QoKS5oZWlnaHQ7XG4gICAgICBhbGVydChoZWlnaHQpXG4gICAgICBjb25zdCB0aGVDb250YWluZXIgPSBub2RlO1xuICAgICAgY29uc3QgdGhlRmFkZUJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29uc3QgdGhlU2hvd01vcmVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblxuICAgICAgdGhlRmFkZUJhci5jbGFzc0xpc3QuYWRkKCdqLWZhZGVyJyk7XG4gICAgICB0aGVTaG93TW9yZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdqLWZhZGVyX19idXR0b24nKTtcblxuICAgICAgdGhlU2hvd01vcmVCdXR0b24uaW5uZXJUZXh0ID0gb3B0aW9ucy5mYkluaXRCdXR0b25UZXh0O1xuXG4gICAgICB0aGVGYWRlQmFyLmFwcGVuZENoaWxkKHRoZVNob3dNb3JlQnV0dG9uKTtcbiAgICAgIHRoZUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGVGYWRlQmFyKTtcblxuICAgICAgdGhlU2hvd01vcmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgICAgLy8gZXYudGFyZ2V0LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgZXYudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ2lzLXZpc2libGUnKTtcbiAgICAgICAgZXYudGFyZ2V0LnBhcmVudE5vZGUuY2xhc3NMaXN0LnRvZ2dsZSgnaXMtdmlzaWJsZScpO1xuICAgICAgICBldi50YXJnZXQuY2xvc2VzdCgnLmotc2hvd21vcmUnKS5jbGFzc0xpc3QudG9nZ2xlKCdpcy12aXNpYmxlJyk7XG4gICAgICB9LCBmYWxzZSk7XG5cbiAgICAgIHRoZVNob3dNb3JlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKGV2KSA9PiB7XG4gICAgICAgIGV2LnRhcmdldC5ibHVyKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnIpO1xuICB9XG59KTtcbi8vIG1vZHVsZS5leHBvcnRzID0gRmFkZUJhcjtcblxuZnVuY3Rpb24gYXBwZW5kQ1NTKHN0eWxlcykge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGNvbnN0IHN0eWxlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIGNvbnN0IGhlYWRFbCA9IGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICAvLyBjb25zdCBjc3NTdHlsZXMgPSBjc3NcblxuICAgIHN0eWxlRWwudGV4dENvbnRlbnQgPSBzdHlsZXM7XG4gICAgaGVhZEVsLmFwcGVuZENoaWxkKHN0eWxlRWwpO1xuXG4gICAgc3R5bGVFbC50eXBlID0gJ3RleHQvY3NzJztcbiAgICBpZiAoc3R5bGVFbC5zdHlsZVNoZWV0KSB7XG4gICAgICAvLyBUaGlzIGlzIHJlcXVpcmVkIGZvciBJRTggYW5kIGJlbG93LlxuICAgICAgc3R5bGVFbC5zdHlsZVNoZWV0LmNzc1RleHQgPSBzdHlsZXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlRWwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3R5bGVzKSk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBjcygpIHtcbiAgY29uc3QgYWxsU2NyaXB0VGFncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NjcmlwdCNzaG93TW9yZUNTJyk7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRzKCkge1xuICByZXR1cm4ge1xuICAgIGJveEhlaWdodDogJzMwMHB4JyxcbiAgICBmYlN0YXJ0Q29sb3I6ICdyZ2JhKDAsMCwwLC43NSknLFxuICAgIGZiRW5kQ29sb3I6ICdyZ2JhKDAsMCwwLC43NSknLFxuICAgIGZiQm90dG9tQm9yZGVyOiAnMXB4IHNvbGlkICNkZWRlZGUnLFxuICAgIGZiSW5pdEJ1dHRvblRleHQ6ICdTaG93IE1vcmUnLFxuICAgIGZiT3BlbkJ1dHRvblRleHQ6ICdTaG93IExlc3MnLFxuICAgIGZiQnV0dG9uUG9zaXRpb246ICdjZW50ZXInLFxuICAgIGZiQnV0dG9uQmFja2dyb3VuZDogJyNmMmYyZjInLFxuICAgIGZiQnV0dG9uQmFja2dyb3VuZEhvdmVyOiAnI2Y4ZjhmODsnLFxuICAgIGZiQnV0dG9uVGV4dENvbG9yOiAnIzJlMmUyZScsXG4gICAgZmJCdXR0b25UZXh0Q29sb3JIb3ZlcjogJyMyZTJlMmUnLFxuICAgIGZiQnV0dG9uVGV4dENvbG9yRm9jdXM6ICcjRkZGJyxcbiAgICBmYkJ1dHRvbkJvcmRlckNvbG9yOiAnI2YyZjJmMicsXG4gICAgZmJCdXR0b25Cb3JkZXJDb2xvckZvY3VzOiAnIzQ5YWFlNicsXG4gICAgZmJDbGFzc0xpc3Q6ICd1LXRleHQtY2VudGVyJyxcbiAgICBmYkJ0bkNsYXNzTGlzdDogJ2MtYnV0dG9uIGMtYnV0dG9uLXByaW1hcnkgdS1teC1hdXRvJyxcbiAgfTtcbn1cblxuZnVuY3Rpb24gc2V0dGluZ3Mob3B0cykge1xuICBsZXQgU2hvd01vcmVTZXR0aW5ncyA9IHR5cGVvZiBudWxsO1xuICBsZXQgZmJDb24gPSBbXTtcbiAgaWYgKCFTaG93TW9yZVNldHRpbmdzKSB7XG4gICAgZmJDb24gPSBkZWZhdWx0cygpO1xuICB9IGVsc2Uge1xuICAgIGZiQ29uID0gU2hvd01vcmVTZXR0aW5ncztcbiAgfVxuXG4gIGNvbnN0IHN0eWxlcyA9IHtcbiAgICBjbGFzc0Jhc2U6ICdidXR0b24tc2hvdy1tb3JlJyxcbiAgICBjbGFzc0FjdGl2ZTogJ2lzLWZ1bGx5LW9wZW5lZCcsXG4gICAgY2xhc3NGb2N1c2VkOiAnaXMtZm9jdXNlZCcsXG4gICAgZmFkZWJhckNsYXNzTGlzdDogJ2FuaW1hdGUgdS10ZXh0LWNlbnRlcicsXG4gICAgZmFkZWJhcmJCdXR0b25DbGFzc0xpc3Q6ICdjLWJ1dHRvbiB1LW14LWF1dG8nLFxuICB9O1xuXG4gIGNvbnN0IGZiQWN0aW9uQnRuID0ge1xuICAgIHNob3dNb3JlOiAnU2hvdyBNb3JlJyxcbiAgICBzaG93TGVzczogJ1Nob3cgTGVzcycsXG4gICAgcG9zaXRpb25YOiAnY2VudGVyJyxcbiAgICBwb3NpdGlvblk6ICdib3R0b20nLFxuXG4gICAgZmJCdXR0b25Qb3NpdGlvbjogJ2NlbnRlcicsXG4gICAgZmJCdXR0b25CYWNrZ3JvdW5kOiAnI2YyZjJmMicsXG4gIH07XG5cbiAgY29uc3Qgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdHMoKSwgc3R5bGVzLCBmYkFjdGlvbkJ0biwgZmJDb24pO1xuICAvLyBjc3NCdWlsZGVyKG9wdGlvbnMpO1xuICByZXR1cm4gb3B0aW9ucztcbn1cbi8vIEZhZGVCYXIoKVxuXG4iXX0=
