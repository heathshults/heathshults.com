'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-216d360b.js');

const HSMediaImage = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return (index.h("div", { class: "hs-media__image" }, index.h("img", { class: "hs-image", alt: this.alt, src: this.src })));
    }
};

exports.hs_media_image = HSMediaImage;
