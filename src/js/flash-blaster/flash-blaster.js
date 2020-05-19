/*!
 *  flashBlaster.js v1.0.0 - removes unstyled content flashing 
 *  while a web page is loading content.
 * 
 *  https://bitbucket:8443/scm/flk/cxd-ds-framekit.git
 *  Copyright (c) 2018 Fannie Mae, Inc.
 *  @license MIT
 *
 *  @mainfunction:    showChildren() 
 *  @parameter:       accordions
 *  @event:           DOMContentLoaded
 */

 /*!* 
  *  @Usage 
  *  In the html page define user options - thats it
  * 
  *  let flashBlasterUserOptions = {
  *    selector: ".js-rootElement",
  *    hideClass: "hideChildren",
  *    showClass: "showChildren"
  *  };
 */

/* eslint-disable no-undef */
let flashBlasterOptions;
// let flashBlasterUserOptions;

let flashBlasterDefaults = {
  selector: ".js-rootElement",
  hideClass: "hideChildren",
  showClass: "showChildren"
};


function FlashBlaster(useropts) {
  if (useropts)
    flashBlasterOptions = Object.assign(flashBlasterDefaults, useropts);
  else flashBlasterOptions = flashBlasterDefaults;

  let components = document.querySelectorAll(flashBlasterOptions.selector);


  function showChildren() {
    components.forEach(component => {
      component.classList.remove(flashBlasterOptions.hideClass);
      component.classList.add(flashBlasterOptions.showClass);
    });
    
    return
  }
  showChildren() 
}
module.exports = FlashBlaster

// let flashBlasterUserOptions = {
//   selector: ".js-rootElement",
//   hideClass: "hideChildren",
//   showClass: "showChildren"
// };
try {
if (typeof flashBlasterUserOptions !== 'undefined') { 
    FlashBlaster(flashBlasterUserOptions)
  }
}
catch(e) {
  let flashBlasterUserOptions = flashBlasterDefaults
  FlashBlaster(flashBlasterUserOptions)
}