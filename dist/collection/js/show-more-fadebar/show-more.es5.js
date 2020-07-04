/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
'use strict';
var FadeBarCSS = function FadeBarCSS() { };
// document.addEventListener('DOMContentLoaded', FadeBarCSS = () => {
FadeBarCSS = function (options) {
    var cssValues = options;
    var fbCSS = '\n    .j-showmore {\n      position: relative;\n      height: ' + cssValues.boxHeight + ';\n      overflow: hidden;\n      padding-bottom: 60px;\n      -webkit-transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);\n         -moz-transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);\n           -o-transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);\n              transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);\n\n      -webkit-transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);\n        -moz-transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);\n          -o-transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);\n              transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);\n    }\n    .j-showmore.is-visible {\n      height: 100%;\n      -webkit-transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);\n         -moz-transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);\n           -o-transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);\n              transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);\n\n      -webkit-transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);\n        -moz-transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);\n          -o-transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);\n              transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);\n    }\n    .j-showmore .j-fader {\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      z-index: 100;\n      width: 100%;\n      height: 50px;\n      text-align: center;\n      vertical-align: bottom;\n      cursor: pointer;\n      border-bottom: 5px solid #f2f2f2;\n      background: -moz-linear-gradient(top, ' + cssValues.fbStartColor + ', ' + cssValues.fbEndColor + ' 60%);\n      background: -webkit-linear-gradient(top, ' + cssValues.fbStartColor + ', ' + cssValues.fbEndColor + ' 60%);\n      background: linear-gradient(to bottom, ' + cssValues.fbStartColor + ', ' + cssValues.fbEndColor + ' 60%);\n      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'' + cssValues.fbStartColor + '\', endColorstr=\'' + cssValues.fbEndColor + '\',GradientType=0 );\n    }\n    .hs-code-preview .j-fader {\n      border-bottom: 5px solid #f2f2f2;\n      background: -moz-linear-gradient(top, rgba(255, 255, 255, 0.6), #ffffff 60%);\n      background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.6), #ffffff 60%);\n      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.6), #ffffff 60%);\n      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#00ffffff\', endColorstr=\'#ffffff\',GradientType=0 );\n    }\n    .j-showmore .j-fader__button {\n      display: inline-block;\n      cursor: pointer;\n      position: absolute;\n      bottom: -6px;\n      left: 50%;\n      margin: auto;\n      padding: 4px 8px;\n      background-color: ' + cssValues.fbButtonBackground + ';\n      border: 1px solid ' + cssValues.fbButtonBorderColor + ';\n      border-bottom: 5px solid ' + cssValues.fbButtonBorderColor + ';\n      font-size: 0.75rem;\n      color: ' + cssValues.fbButtonTextColor + ';\n      width: 120px;\n      height: 26px;\n      white-space: nowrap;\n      transform: translateX(-50%);\n    }\n    .j-showmore .j-fader__button::before {\n      display: block;\n      position: absolute;\n      left: 50%;\n      top: 5%;\n      z-index: 100;\n      transform: translate(-50%);\n      width: 100%;\n      content: \'' + cssValues.fbInitButtonText + '\';\n      font-size: 0.75rem;\n    }\n    .j-showmore .j-fader__button.is-visible::before {\n      content: \'' + cssValues.fbOpenButtonText + '\';\n    }\n    .j-showmore .j-fader__button:hover {\n      background-color: ' + cssValues.fbButtonBackgroundHover + ';\n      color: ' + cssValues.fbButtonTextColorHover + ';\n    }\n    .j-showmore .j-fader__button:focus {\n      outline-color: ' + cssValues.fbButtonBorderColorFocus + ';\n      background-color: ' + cssValues.fbButtonBorderColorFocus + ';\n      color: ' + cssValues.fbButtonTextColorFocus + ';\n      border: 1px solid ' + cssValues.fbButtonBorderColorFocus + ';\n      border-bottom: 5px solid ' + cssValues.fbButtonBorderColorFocus + ';\n      box-shadow: unset;\n    }\n    .j-showmore .j-fader__button.is-visible {\n      background-color: ' + cssValues.fbButtonBorderColorFocus + ';\n      color: ' + cssValues.fbButtonTextColorFocus + ';\n      border: 1px solid ' + cssValues.fbButtonBorderColorFocus + ';\n      border-bottom: 5px solid ' + cssValues.fbButtonBorderColorFocus + ';\n    }\n    .j-showmore .j-fader.is-visible {\n      border-bottom: 5px solid ' + cssValues.fbButtonBorderColorFocus + ';\n    }\n    @keyframes slideOpen {\n      from { height: 300px; }\n      to { height: 100%; }\n    }\n    @keyframes slideClosed {\n      from { height: 100%; }\n      to { height: 300px; } \n    }\n  ';
    // appendCSS(fbCSS)
    return fbCSS;
};
var FadeBar = function FadeBar() { };
document.addEventListener('DOMContentLoaded', module.exports = FadeBar = function () {
    var VERSION = '0.0.1';
    var NAME = 'ShowMore_FadeBar';
    console.log('Now using ' + NAME + ' version ' + VERSION);
    // prepare the style tage for some css luvin
    var styleEl = document.createElement('style');
    var headEl = document.head || document.getElementsByTagName('head')[0];
    var options = settings();
    var cssText = FadeBarCSS(options);
    // console.log(options);
    styleEl.setAttribute('id', 'fbCSS');
    styleEl.textContent = cssText;
    headEl.append(styleEl);
    try {
        var theFaders = Array.prototype.slice.call(document.querySelectorAll('.j-showmore'));
        theFaders.forEach(function (node) {
            var theContainer = node;
            var theFadeBar = document.createElement('div');
            var theShowMoreButton = document.createElement('button');
            theFadeBar.classList.add('j-fader');
            theShowMoreButton.classList.add('j-fader__button');
            theShowMoreButton.innerHTML = '';
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
    }
    catch (err) {
        console.error(err);
    }
});
// module.exports = FadeBar;
function appendCSS(styles) {
    return function () {
        var styleEl = document.createElement('style');
        var headEl = document.head || document.getElementsByTagName('head')[0];
        // const cssStyles = css
        styleEl.textContent = styles;
        headEl.appendChild(styleEl);
        styleEl.type = 'text/css';
        if (styleEl.styleSheet) {
            // This is required for IE8 and below.
            styleEl.styleSheet.cssText = styles;
        }
        else {
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
        fbStartColor: 'rgba(248, 248, 248, 0.6)',
        fbEndColor: '#f8f8f8',
        fbBottomBorder: '1px solid #dedede',
        fbInitButtonText: '+ Show More',
        fbOpenButtonText: '- Show Less',
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
    var ShowMoreSettings = typeof null;
    var fbCon = [];
    if (!ShowMoreSettings) {
        fbCon = defaults();
    }
    else {
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
    var options = Object.assign(defaults(), styles, fbActionBtn, fbCon);
    // cssBuilder(options);
    return options;
}
