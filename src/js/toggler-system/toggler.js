/**
* @fileOverview
* @author Heath Shults
* @version 1.0.4
*/

/**
* @description
* Vanilla JavaScript Toggler
*
* @class Toggler
* @param {(string|Object)} options.element - HTML element of the Toggler container.
*         or the DOM element.
* @param {number} [options.openPanelIndex=1] - Start the Toggler with this item opened.
* @param {boolean} [options.oneOpenPanel=true] - Only one panel can be opened at a time.
*/

let setAttr
let targetPanelId

let acc = []
let accOptions = {}



class Toggler {
  constructor(options) {
    var element = typeof options.element === 'string' ? document.getElementById(options.element) : options.element
    var openPanelIndex = options.openPanelIndex,
        oneOpenPanel = options.oneOpenPanel || false,

        panelControllerClass     = 'js-panelController',
        titleClass               = 'js-panelController__title',
        contentClass             = 'js-targetPanel',
        closedClass              = 'is-closed',
        openedClass              = 'is-open';

        try {
          setAttr = (elem, attr, value) => {
            elem.setAttribute(attr, value)
          }
        }
        catch(e) {
          console.log('Error setting attribute: \n' + e)
        }
        function generateId() {
          return '_' + Math.random().toString(36).substr(2, 9);
        }
        console.log('oneOpenPanel: '+oneOpenPanel)
    render();

    /**
     * Initial rendering of the Toggler.
     */
    function render() {
      if (typeof element === undefined || typeof element === 'undefined' || element === null) return
      // attach classes to buttons and containers
      [].forEach.call(element.querySelectorAll(`.${panelControllerClass}`),
        function(item, index) {
          item.classList.add(titleClass);
          item.classList.add(closedClass);

          let targetPanel = item.nextElementSibling
          targetPanel.classList.add(contentClass);
          
          // set the id to the index and root element
          // item.setAttribute('id', element + index)
          // item.setAttribute('data-index', index)
          setAttr(targetPanel, 'id', generateId())
          targetPanelId = targetPanel.getAttribute('id')
          setAttr(item, 'data-target', targetPanelId)
          setAttr(item, 'id', generateId())
          setAttr(item, 'data-index', index)
        });

      // attach only one click listener
      element.addEventListener('click', onClick);

      // Toggler starts with all panels closed
      closeAll();

      // sets the open panel - if defined
      if (openPanelIndex) {
          open(openPanelIndex);
      }
    }

    /**
     * Handles clicks on the Toggler.
     *
     * @param {object} e - Element the click occured on.
     */
    function onClick(e) {
      let evTarget = e.target
      // let evTargetID = evTarget.getAttribute('id')
      // let evTargetsTargetPanel = document.getElementById(evTarget.getAttribute('data-target'))

      if (e.target.className.indexOf(panelControllerClass) === -1) {
        return;
      }

      if (oneOpenPanel && evTarget.classList.contains(openedClass)) {
          closeAll();
          return
      } else

      if (oneOpenPanel && evTarget.classList.contains(closedClass)) {
        closeAll();
        toggle(e.target.nextElementSibling);
        return
      } else 

      if (!oneOpenPanel) {
        toggle(e.target.nextElementSibling);
      }
    }

    /**
     * Closes all Toggler panels.
     */
    function closeAll() {
        [].forEach.call(element.querySelectorAll('.' + contentClass), function(item) {
            item.style.maxHeight = 0;
            item.setAttribute('aria-hidden', true)
            item.previousElementSibling.classList.remove(openedClass)
            item.previousElementSibling.classList.add(closedClass)
        });
    }

    /**
     * Toggles corresponding panel for each panel controller clicked.
     *
     * @param {object} el - The content panel to show or hide.
     */
    function toggle(el) {
        // getting the height every time in case
        // the content was updated dynamically
        var height = el.scrollHeight;

        if (el.style.maxHeight === '0px' || el.style.maxHeight === '') {
            el.style.maxHeight = height + 'px';
            el.setAttribute('aria-hidden', false)
            el.previousElementSibling.classList.remove(closedClass)
            el.previousElementSibling.classList.add(openedClass)
        } else {
            el.style.maxHeight = 0;
            el.setAttribute('aria-hidden', true)
            el.previousElementSibling.classList.add(closedClass)
            el.previousElementSibling.classList.remove(openedClass)
        }
    }


    /**
     * Returns the corresponding toggle target panel content element by index.
     *
     * @param {number} n - Index of panel to return
     */
    function getTarget(n) {
        return element.querySelectorAll('.' + contentClass)[n - 1];
    }

    /**
     * Opens a panel by index.
     *
     * @param {number} n - Index of panel to open.
     *
     * @public
     */
    function open(n) {
        var target = getTarget(n);

        if (target) {
            if (oneOpenPanel) closeAll();
            target.previousElementSibling.classList.remove(closedClass)
            target.previousElementSibling.classList.add(openedClass)
            target.style.maxHeight = target.scrollHeight + 'px';
            target.setAttribute('aria-hidden', false)
        }
    }

    /**
     * Closes a panel by index.
     *
     * @param {object} controller - Controller element to close.
     * @param {object} panel - The panel that belongs lo this controller.
     * 
     * @public
     */
    function close(controller, panel) {
        var panelController = controller;
        var contentPanel = panel;

        if (panelController) {
          panelController.classList.remove(openedClass)
          panelController.classList.add(closedClass)
        }

        if (contentPanel) {
          contentPanel.style.maxHeight = 0;
          setAttr(contentPanel, 'aria-hidden', true)
        }
    }

    /**
     * Destroys the Toggler.
     *
     * @public
     */
    function destroy() {
        element.removeEventListener('click', onClick);
    }

    return {
        open: open,
        close: close,
        destroy: destroy
    };
  }
}
exports.Toggler = Toggler
console.log('external javascript loaded')
// if (togglerSettings) {
//   Toggler(togglerSettings)
// } else {return}
// console.log(togglerSettings.accordion[1])
// try {
//   if (typeof togglerSettings !== 'undefined') {
//     let parsedSettings = JSON.stringify(togglerSettings)
//     for (let i=0; i < parsedSettings.length; i++)
//       acc = Object.fromEntries(parsedSettings[i])
//       console.log(acc)
//     }
//   }
// catch(e) {
//   console.log(e)
// }









let accordion1 = new Toggler( {
  element: "acc1",    // ID of the Toggler container
  openPanelIndex: '2',         // [optional] Toggler panel to start opened with. All tabs closed if not set.
  oneOpenPanel: true      // [optional] Allow one Toggler panel only to be opened at a time
})

let accordion2 = new Toggler( {
  rootElement: "acc2",    // ID of the Toggler container
  openPanelIndex: '1',         // [optional] Toggler panel to start opened with. All tabs closed if not set.
  oneOpenPanel: true      // [optional] Allow one Toggler panel only to be opened at a time
})

let accordion3 = new Toggler( {
  rootElement: "acc3",    // ID of the Toggler container
  openPanelIndex: '',         // [optional] Toggler panel to start opened with. All tabs closed if not set.
  oneOpenPanel: false      // [optional] Allow one Toggler panel only to be opened at a time
})

let accordion4 = new Toggler( {
  rootElement: "accUL",    // ID of the Toggler container
  openPanelIndex: '0',         // [optional] Toggler panel to start opened with. All tabs closed if not set.
  oneOpenPanel: false      // [optional] Allow one Toggler panel only to be opened at a time
})

let accordion5 = new Toggler( {
  rootElement: "accDL",    // ID of the Toggler container
  openPanelIndex: '1',         // [optional] Toggler panel to start opened with. All tabs closed if not set.
  oneOpenPanel: false      // [optional] Allow one Toggler panel only to be opened at a time
})
