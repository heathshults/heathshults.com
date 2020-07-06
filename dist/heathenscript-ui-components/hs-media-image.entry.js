import { r as registerInstance, h } from './index-46862ff0.js';

const HSMediaImage = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("div", { class: "hs-media__image" }, h("img", { class: "hs-image", alt: this.alt, src: this.src })));
    }
};

export { HSMediaImage as hs_media_image };
