/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
let height;
let FadeBar = () => { };
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
            height = node.offsetHeight;
            console.log(height);
            const theContainer = node;
            const theFadeBar = document.createElement('div');
            const theShowMoreButton = document.createElement('button');
            theFadeBar.classList.add('j-fader');
            theShowMoreButton.classList.add('j-fader__button');
            theShowMoreButton.innerText = options.fbInitButtonText;
            theFadeBar.appendChild(theShowMoreButton);
            theContainer.appendChild(theFadeBar);
            theShowMoreButton.addEventListener('click', (ev) => {
                ev.preventDefault();
                ev.target.classList.toggle('is-visible');
                ev.target.parentNode.classList.toggle('is-visible');
                ev.target.closest('.j-showmore').classList.toggle('is-visible');
                if (ev.target.classList.contains('is-visible')) {
                    ev.target.parentElement.style.height = height;
                }
                if (ev.target.innerText === options.fbInitButtonText) {
                    ev.target.innerText = options.fbOpenButtonText;
                }
                else {
                    ev.target.innerText = options.fbInitButtonText;
                }
            }, false);
            theShowMoreButton.addEventListener('mouseout', (ev) => {
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
    return;
    // return () => {
    //   const styleEl = document.createElement('style');
    //   const headEl = document.head || document.getElementsByTagName('head')[0];
    //   // const cssStyles = css
    //   styleEl.textContent = styles;
    //   headEl.appendChild(styleEl);
    //   styleEl.type = 'text/css';
    //   if (styleEl.styleSheet) {
    //     // This is required for IE8 and below.
    //     styleEl.styleSheet.cssText = styles;
    //   } else {
    //     styleEl.appendChild(document.createTextNode(styles));
    //   }
    // };
}
function cs() {
    const allScriptTags = document.querySelector('script#showMoreCS');
}
function defaults() {
    return {
        boxHeight: '300px',
        fbStartColor: 'rgba(0,0,0,.75)',
        fbEndColor: 'rgba(0,0,0,.75)',
        fbBottomBorder: '5px solid #2e2e2e',
        fbInitButtonText: 'Show More',
        fbOpenButtonText: 'Show Less',
        fbButtonPosition: 'center',
        fbButtonBackground: '#000',
        fbButtonBackgroundHover: '#580505;',
        fbButtonBackgroundFocus: '#580505;',
        fbButtonTextColor: '#fff',
        fbButtonTextColorHover: '#fff',
        fbButtonTextColorFocus: '#FFF',
        fbButtonBorderColor: '#2e2e2e',
        fbButtonBorderColorFocus: '#580505',
        fbClassList: 'u-text-center',
        fbBtnClassList: 'btn btn-primary mx-auto',
    };
}
function settings(opts) {
    let ShowMoreSettings = typeof null;
    let fbCon = [];
    if (!ShowMoreSettings) {
        fbCon = defaults();
    }
    else {
        fbCon = ShowMoreSettings;
    }
    const styles = {
        classBase: 'button-show-more',
        classActive: 'is-fully-opened',
        classFocused: 'is-focused',
        fadebarClassList: 'animate text-center',
        fadebarbButtonClassList: 'btn mx-auto',
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
let FadeBarCSS = () => { };
// document.addEventListener('DOMContentLoaded', FadeBarCSS = () => {
FadeBarCSS = (options) => {
    const cssValues = options;
    const fbCSS = '';
    // appendCSS(fbCSS)
    return fbCSS;
};
// FadeBar()
