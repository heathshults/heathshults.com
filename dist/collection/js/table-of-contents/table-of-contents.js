const TableOfContents = (function () {
    'use strict';
    let buildCSS = () => {
        const tocCSS = `
    .hs-toc {
      position: fixed; 
      top: 220px; 
      right:48px;
      z-index:100;
      width:200px;
      background:#fff;
      padding: 1rem;
      border-radius: 4px;
      box-shadow: 1px 5px 6px rgba(0, 0, 0, 0.25);
    }
    .hs-toc .hs-tocNav {
      list-style: none;
    }
    .hs-toc .hs-tocNav > li {
      font-size: 14px;
    }
    `;
        const styleEl = document.createElement('style');
        const headEl = document.head || document.getElementsByTagName('head')[0];
        styleEl.setAttribute('id', 'tocCSS');
        styleEl.textContent = tocCSS;
        headEl.append(styleEl);
        return;
    };
    buildCSS();
    var Constructor = function (selector) {
        let tocPanel = document.createElement('div');
        tocPanel.classList.add('hs-toc');
        let tocPanelTitle = document.createElement('h4');
        tocPanelTitle.innerHTML = 'On this page';
        let tocNav = document.createElement('ul');
        tocNav.classList.add('hs-tocNav');
        tocPanel.appendChild(tocPanelTitle);
        tocPanel.appendChild(tocNav);
        let headingTags = Array.prototype.slice.call(document.querySelectorAll(selector));
        if (headingTags.length <= 3) {
            return;
        }
        headingTags.forEach((node) => {
            // get the title from node text  
            let title = node.textContent;
            // create the li that holds the links
            let tocNavItem = document.createElement('li');
            // create the named anchor element and add the anchor name
            let anchor = document.createElement('a');
            anchor.name = title;
            anchor.innerHTML = title;
            anchor.classList.add('hs-tocNavLink');
            node.textContent = '';
            node.appendChild(anchor);
            // create the nav link, add href, class and innerHTML
            let tocNavLink = document.createElement('a');
            tocNavLink.href = `#${title}`;
            tocNavLink.classList.add('triggerShowMore');
            tocNavLink.innerHTML = title;
            // smooth scroll to the anchor
            $(tocNavLink).on('click', (event) => {
                $('html, body').animate({
                    scrollTop: $(`[name="${title}"]`).offset().top
                }, 500);
                return false;
            });
            // add the link to the li
            tocNavItem.appendChild(tocNavLink);
            // add the li to the ul
            tocNav.appendChild(tocNavItem);
            // callback(this.nodes[i], i)
        });
        // add the toc panel to the page after the body tag
        let thebody = document.body;
        thebody.prepend(tocPanel);
        // Add a class to each element
        Constructor.prototype.addClass = function (className) {
            this.forEach(function (node) {
                node.classList.add(className);
            });
        };
    };
    return Constructor;
})();
// Create a new instance of the constructor
var headings = new TableOfContents('h1, h2, h3');
// Run a method
// headings.addClass('heading-big');
