import { Component, h } from '@stencil/core';
export class HSMediaBody {
    render() {
        return (h("div", { class: "hs-media__body" },
            h("slot", null)));
    }
    static get is() { return "hs-media-body"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../scss/components/components.cards.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../scss/components/components.cards.css"]
    }; }
}
