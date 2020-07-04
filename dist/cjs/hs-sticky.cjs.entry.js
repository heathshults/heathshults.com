'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-216d360b.js');

const Sticky = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
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
        return (index.h("div", { style: this.staticStyles }, index.h("div", { style: this.stickyStyles }, index.h("slot", null))));
    }
    get elem() { return index.getElement(this); }
};

exports.hs_sticky = Sticky;
