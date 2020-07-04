import { Component, h } from '@stencil/core';
export class HSCardFooter {
    render() {
        return (h("footer", { class: "hs-card__footer" },
            h("slot", null)));
    }
    static get is() { return "hs-card-footer"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../scss/components/components.cards.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../scss/components/components.cards.css"]
    }; }
}
