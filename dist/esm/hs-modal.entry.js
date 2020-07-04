import { r as registerInstance, c as createEvent, h, g as getElement } from './index-57471f3a.js';

const objectsModalsCss = ".hs-modal[role=dialog]{position:fixed;top:50%;left:50%;z-index:500;display:block;width:75%;overflow:hidden;background-color:#fff;border:0 solid #74748c;border-radius:4px;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);visibility:hidden;opacity:0}.hs-modal[role=dialog]>.hs-card{background-color:transparent;-webkit-box-shadow:none;box-shadow:none}.hs-modal[role=dialog]>.hs-card .hs-card__body{position:relative}.hs-modal[role=dialog].hs-modal--ghost{color:#fff;background-color:transparent}.hs-modal[role=dialog].hs-modal--ghost .hs-heading{color:#fff}.hs-modal[role=dialog].hs-modal--full{top:1em;left:1em;width:calc(100% - 2em);height:calc(100% - 2em);-webkit-transform:none;transform:none}.hs-modal[role=dialog].hs-modal--full .hs-card__body{position:absolute;top:3.5em;bottom:4em;width:100%;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch}.hs-modal[role=dialog].hs-modal--full .hs-card__footer{position:absolute;bottom:0;width:100%}.hs-modal[role=dialog].hs-modal--visible{visibility:visible;opacity:1}.hs-button--close{top:0.5em}";

const Modal = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ghost = false;
        this.full = false;
        this.open = false;
        this.dismissible = false;
        this._isOpen = false;
        this.onClose = createEvent(this, "close", 7);
    }
    async close() {
        this._isOpen = false;
        this.onClose.emit();
    }
    async show() {
        this._isOpen = true;
    }
    async isOpen() {
        return this._isOpen;
    }
    componentWillLoad() {
        this._isOpen = this.open;
    }
    dismiss() {
        if (this.dismissible)
            this.close();
    }
    render() {
        const ghostClass = this.ghost ? `hs-modal--ghost` : '';
        const fullClass = this.full ? `hs-modal--full` : '';
        const modalIsOpenClass = this._isOpen ? 'hs-modal--visible' : '';
        const overlayIsOpenClass = this._isOpen ? 'hs-overlay--visible' : '';
        return [
            h("div", { "aria-hidden": true, onClick: () => this.dismiss(), class: `hs-overlay hs-overlay--fullpage ${overlayIsOpenClass}` }),
            h("div", { role: "dialog", class: `hs-modal ${ghostClass} ${fullClass} ${modalIsOpenClass}` }, this.dismissible && (h("button", { type: "button", class: "hs-button hs-button--close", onClick: () => this.close() }, "\u00D7")), h("slot", null))
        ];
    }
    get elem() { return getElement(this); }
};
Modal.style = objectsModalsCss;

export { Modal as hs_modal };
