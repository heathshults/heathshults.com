import { r as registerInstance, h, g as getElement } from './index-57471f3a.js';
var Sticky = /** @class */ (function () {
    function Sticky(hostRef) {
        registerInstance(this, hostRef);
        this.top = 0;
    }
    Sticky.prototype.componentWillUpdate = function () {
        this.positionElement();
    };
    Sticky.prototype.positionElement = function () {
        this.dimensions = this.elem.children[0].getBoundingClientRect();
        this.offsetTop = this.dimensions.top + window.scrollY;
        if (this.offsetTop - window.scrollY - this.top <= 0) {
            this.staticStyles = {
                width: this.dimensions.width + "px",
                height: this.dimensions.height + "px",
            };
            this.stickyStyles = {
                position: 'fixed',
                top: this.top + "px",
                left: this.dimensions.left + "px",
                width: this.dimensions.width + "px",
            };
        }
        else {
            this.staticStyles = {};
            this.stickyStyles = {};
        }
    };
    Sticky.prototype.render = function () {
        return (h("div", { style: this.staticStyles }, h("div", { style: this.stickyStyles }, h("slot", null))));
    };
    Object.defineProperty(Sticky.prototype, "elem", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    return Sticky;
}());
export { Sticky as hs_sticky };
