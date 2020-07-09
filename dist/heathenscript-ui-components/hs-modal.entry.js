import { r as registerInstance, e as createEvent, h, g as getElement } from './index-46862ff0.js';

const objectsModalsCss = ".hs-modal[role=dialog]{position:fixed;top:50%;left:50%;z-index:1071;display:block;width:75%;overflow:hidden;visibility:hidden;background-color:#fff;border:0 solid #74748c;border-radius:4px;opacity:0;transform:translate(-50%, -50%)}.hs-modal[role=dialog] .hs-button--close{position:fixed;top:1em;left:0;z-index:1032;opacity:0;transition:all 0.25s ease-out}.hs-modal[role=dialog]>.hs-card{background-color:transparent;box-shadow:none}.hs-modal[role=dialog]>.hs-card .hs-card__body{position:relative}.hs-modal[role=dialog].hs-modal--ghost{color:#fff;background-color:transparent}.hs-modal[role=dialog].hs-modal--ghost .hs-heading{color:#fff}.hs-modal[role=dialog].hs-modal--full{top:0%;left:50%;z-index:1071;width:90%;height:0;transition:all 0.25s ease-out;transition-delay:0.12s;transform:translateX(-50%)}.hs-modal[role=dialog].hs-modal--full.hs-modal--visible{height:100vh;background-color:#0f161d;opacity:1;transition:all 0.25s ease-in;transition-delay:0.12s}.hs-modal[role=dialog].hs-modal--full.hs-modal--visible .hs-button--close{position:fixed;top:10px;right:10px;left:unset;z-index:1032;width:4rem;height:4rem;font-size:5rem;color:#fff;cursor:pointer;background-color:transparent;border:none;outline:none;opacity:1;transition:all 0.25s ease-in}.hs-modal[role=dialog].hs-modal--full .hs-card__body{position:absolute;top:3.5em;bottom:4em;width:100%;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch;color:#fff}.hs-modal[role=dialog].hs-modal--full .hs-card__footer{position:absolute;bottom:0;width:100%}.hs-modal[role=dialog].hs-modal--visible{visibility:visible;opacity:1}.hs-modal[role=dialog].hs-modal--visible+.hs-section{background-attachment:fixed}.hs-modal-backdrop{position:fixed;top:0px;right:0px;bottom:0px;left:0px;width:100%;height:0;background-color:rgba(0, 0, 0, 0.75);opacity:0;transition:all 0.25s ease-in;transition-delay:0.12s}.hs-modal-backdrop.hs-modal-backdrop--visible{top:0px;z-index:1070;height:100vh;opacity:1;transition:all 0.25s ease-out}";

const HSModal = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ghost = false;
        this.full = false;
        this.open = false;
        this.dismissible = false;
        this.winHeight = window.innerHeight;
        this._isOpen = false;
        this.onClose = createEvent(this, "close", 7);
    }
    async close() {
        this._isOpen = false;
        this.onClose.emit();
        this.handleOverlay();
    }
    componentWillLoad() {
        this._isOpen = this.open;
    }
    handleOverlay() {
        this.overlay = this.elem.shadowRoot.querySelector('#overlay');
        this.overlay.classList.toggle('hs-modal-backdrop--visible');
        () => {
            let sec = this.elem.closest('section');
            sec !== null ? sec.style.cssText = 'background-attachment: fixed;' : sec.style.cssText = 'background-attachment: unset';
        };
        let overlayHeight = this.overlay.style.height;
        typeof overlayHeight === 'undefined' || overlayHeight < 1 ? overlayHeight = `${document.body.clientHeight}` : overlayHeight = 0;
    }
    // componentDidLoad() {
    //   this.overlay = this.elem.shadowRoot.querySelector('#overlay') as HTMLElement;
    //   console.log(this.overlay)
    // }
    async show() {
        this._isOpen = true;
        this.handleOverlay();
        //this.overlay = this.elem.shadowRoot.querySelector('#overlay') as HTMLElement;
        //this.overlay.style.height = this.winHeight;
    }
    async isOpen() {
        return this._isOpen;
    }
    dismiss() {
        if (this.dismissible)
            this.close();
    }
    render() {
        const ghostClass = this.ghost ? `hs-modal--ghost` : '';
        const fullClass = this.full ? `hs-modal--full` : '';
        const modalIsOpenClass = this._isOpen ? 'hs-modal--visible' : '';
        const overlayIsOpenClass = this._isOpen ? 'hs-modal-backdrop--visible' : '';
        return [
            h("div", { id: "overlay", "aria-hidden": true, onClick: () => this.dismiss(), class: `hs-modal-backdrop ${overlayIsOpenClass}` }),
            h("div", { role: "dialog", class: `hs-modal ${ghostClass} ${fullClass} ${modalIsOpenClass}` }, this.dismissible && (h("button", { type: "button", class: "hs-button hs-button--close", onClick: () => this.close() }, "\u00D7")), h("slot", null))
        ];
    }
    get elem() { return getElement(this); }
};
HSModal.style = objectsModalsCss;

export { HSModal as hs_modal };
