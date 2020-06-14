/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
let FadeBarCSS = () => {};
// document.addEventListener('DOMContentLoaded', FadeBarCSS = () => {
FadeBarCSS = (options) => {
  const cssValues = options;

  const fbCSS = `
    .j-showmore {
      position: relative;
      height: ${cssValues.boxHeight};
      overflow: hidden;
      padding-bottom: 60px;
      -webkit-transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);
         -moz-transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);
           -o-transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);
              transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);
      -webkit-transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);
        -moz-transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);
          -o-transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);
              transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);
    }
    .j-showmore.is-visible {
      height: 100%;
      -webkit-transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);
         -moz-transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);
           -o-transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);
              transition: all 500ms cubic-bezier(0.770, 0.000, 0.155, 1.000);
      -webkit-transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);
        -moz-transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);
          -o-transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);
              transition-timing-function: cubic-bezier(0.770, 0.000, 0.155, 1.000);
    }
    .j-showmore .j-fader {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 30px;
      text-align: center;
      vertical-align: bottom;
      cursor: pointer;
      border-bottom: 5px solid #f2f2f2;
      background: -moz-linear-gradient(top, ${cssValues.fbStartColor} 0%, ${cssValues.fbEndColor} 65%, ${cssValues.fbEndColor} 75%);
      background: -webkit-linear-gradient(top, ${cssValues.fbStartColor} 0%, ${cssValues.fbEndColor} 65%, ${cssValues.fbEndColor} 75%);
      background: linear-gradient(to bottom, ${cssValues.fbStartColor} 0%, ${cssValues.fbEndColor} 65%, ${cssValues.fbEndColor} 75%);
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='${cssValues.fbStartColor}', endColorstr='${cssValues.fbEndColor}',GradientType=0 );
    }
    .c-code-preview .j-fader {
      border-bottom: 5px solid #f2f2f2;
      background: -moz-linear-gradient(top, rgba(255, 255, 255, 0.6), #ffffff 60%);
      background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0.6), #ffffff 60%);
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.6), #ffffff 60%);
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=0 );
    }
    .j-showmore .j-fader__button {
      display: inline-block;
      cursor: pointer;
      position: absolute;
      bottom: -2px;
      left: 50%;
      margin: auto;
      padding: 4px 8px;
      background-color: ${cssValues.fbButtonBackground};
      border: 1px solid ${cssValues.fbButtonBorderColor};
      border-bottom: 5px solid ${cssValues.fbButtonBorderColor};
      font-size: 1rem;
      color: ${cssValues.fbButtonTextColor};
      width: 120px;
      height: 26px;
      white-space: nowrap;
      transform: translateX(-50%);
    }
    .j-showmore .j-fader__button::before {
      display: block;
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 100;
      transform: translate(-50%);
      width: 100%;
      content: '${cssValues.fbInitButtonText}';
      font-size: 1rem;
    }
    .j-showmore .j-fader__button.is-visible::before {
      content: '${cssValues.fbOpenButtonText}';
    }
    .j-showmore .j-fader__button:hover {
      background-color: ${cssValues.fbButtonBackgroundHover};
      color: ${cssValues.fbButtonTextColorHover};
    }
    .j-showmore .j-fader__button:focus {
      outline-color: ${cssValues.fbButtonBorderColorFocus};
      background-color: ${cssValues.fbButtonBorderColorFocus};
      color: ${cssValues.fbButtonTextColorFocus};
      border: 1px solid ${cssValues.fbButtonBorderColorFocus};
      border-bottom: 5px solid ${cssValues.fbButtonBorderColorFocus};
      box-shadow: unset;
    }
    .j-showmore .j-fader__button.is-visible {
      background-color: ${cssValues.fbButtonBorderColorFocus};
      color: ${cssValues.fbButtonTextColorFocus};
      border: 1px solid ${cssValues.fbButtonBorderColorFocus};
      border-bottom: 5px solid ${cssValues.fbButtonBorderColorFocus};
    }
    .j-showmore .j-fader.is-visible {
      border-bottom: 5px solid ${cssValues.fbButtonBorderColorFocus};
    }
    @keyframes slideOpen {
      from { height: 300px; }
      to { height: 100%; }
    }
    @keyframes slideClosed {
      from { height: 100%; }
      to { height: 300px; } 
    }
  `;

  // appendCSS(fbCSS)
  return fbCSS;
};
let FadeBar = () => {};
document.addEventListener('DOMContentLoaded', FadeBar = () => {
  const VERSION = '0.0.1';
  const NAME = 'ShowMore_FadeBar';
  console.log(`Now using ${NAME} version ${VERSION}`);
  // prepare the style tage for some css luvin
  const styleEl = document.createElement('style');
  const headEl = document.head || document.getElementsByTagName('head')[0];

  const options = settings();
  const cssText = FadeBarCSS(options);
  // console.log(options);

  styleEl.setAttribute('id', 'fbCSS');
  styleEl.textContent = cssText;
  headEl.append(styleEl);

  try {
    const theFaders = Array.prototype.slice.call(document.querySelectorAll('.j-showmore'));

    theFaders.forEach((node) => {
      const height = node.offsetHeight;
      console.log(height)
      const theContainer = node;
      const theFadeBar = document.createElement('div');
      const theShowMoreButton = document.createElement('button');

      theFadeBar.classList.add('j-fader');
      theShowMoreButton.classList.add('j-fader__button');

      theShowMoreButton.innerText = options.fbInitButtonText;

      theFadeBar.appendChild(theShowMoreButton);
      theContainer.appendChild(theFadeBar);

      theShowMoreButton.addEventListener('click', (ev) => {
        // ev.target.preventDefault()
        ev.target.classList.toggle('is-visible');
        ev.target.parentNode.classList.toggle('is-visible');
        ev.target.closest('.j-showmore').classList.toggle('is-visible');
      }, false);

      theShowMoreButton.addEventListener('mouseout', (ev) => {
        ev.target.blur();
      });
    });
  } catch (err) {
    console.error(err);
  }
});
// module.exports = FadeBar;

function appendCSS(styles) {
  return () => {
    const styleEl = document.createElement('style');
    const headEl = document.head || document.getElementsByTagName('head')[0];
    // const cssStyles = css

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
  const allScriptTags = document.querySelector('script#showMoreCS');
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
    fbBtnClassList: 'c-button c-button-primary u-mx-auto',
  };
}

function settings(opts) {
  let ShowMoreSettings = typeof null;
  let fbCon = [];
  if (!ShowMoreSettings) {
    fbCon = defaults();
  } else {
    fbCon = ShowMoreSettings;
  }

  const styles = {
    classBase: 'button-show-more',
    classActive: 'is-fully-opened',
    classFocused: 'is-focused',
    fadebarClassList: 'animate u-text-center',
    fadebarbButtonClassList: 'c-button u-mx-auto',
  };

  const fbActionBtn = {
    showMore: 'Show More',
    showLess: 'Show Less',
    positionX: 'center',
    positionY: 'bottom',

    fbButtonPosition: 'center',
    fbButtonBackground: '#f2f2f2',
  };

  const options = Object.assign(defaults(), styles, fbActionBtn, fbCon);
  // cssBuilder(options);
  return options;
}
// FadeBar()