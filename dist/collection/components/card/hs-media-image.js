import { Component, Prop, h } from '@stencil/core';
export class HSMediaImage {
    render() {
        return (h("div", { class: "hs-media__image" },
            h("img", { class: "hs-image", alt: this.alt, src: this.src })));
    }
    static get is() { return "hs-media-image"; }
    static get properties() { return {
        "src": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "src",
            "reflect": false
        },
        "alt": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "alt",
            "reflect": false
        }
    }; }
}
