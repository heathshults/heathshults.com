import { r as registerInstance, h, g as getElement } from './index-46862ff0.js';

const Sticky = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.top = 0;
    }
    componentWillUpdate() {
        this.positionElement();
    }
    positionElement() {
        this.dimensions = this.elem.children[0].getBoundingClientRect();
        this.offsetTop = this.dimensions.top + window.scrollY;
        if (this.offsetTop - window.scrollY - this.top <= 0) {
            this.staticStyles = {
                width: `${this.dimensions.width}px`,
                height: `${this.dimensions.height}px`,
            };
            this.stickyStyles = {
                position: 'fixed',
                top: `${this.top}px`,
                left: `${this.dimensions.left}px`,
                width: `${this.dimensions.width}px`,
            };
        }
        else {
            this.staticStyles = {};
            this.stickyStyles = {};
        }
    }
    render() {
        return (h("div", { style: this.staticStyles }, h("div", { style: this.stickyStyles }, h("slot", null))));
    }
    get elem() { return getElement(this); }
};

export { Sticky as hs_sticky };
