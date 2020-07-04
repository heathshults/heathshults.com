/*!
 * back-to-top.js v1.0.0 - Adds smooth scrolling to scrolling events.
 * previous name scroll-smooth.js
 * https://bitbucket:8443/scm/flk/cxd-blueprint-ui.git
 * Copyright (c) 2018 Fannie Mae, Inc.
 * @license MIT
 */
var backtotopbtn, backtotop;
module.exports = function scroll() {
    if (!backtotop) {
        return;
    }
    backtotopbtn = document.querySelector(".bp-backtotop");
    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () { scrollFunction(); };
    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backtotop.style.display = "inline-block";
        }
        else {
            backtotop.style.display = "none";
        }
    }
    // When the user clicks on the button, scroll to the top of the document
    /**
     * @param {{ preventDefault: () => void; }} e
     */
    function topFunction(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    backtotopbtn.addEventListener('click', topFunction);
};
scroll();
