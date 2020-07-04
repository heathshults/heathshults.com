import { Component, h } from '@stencil/core';
export class HSCard {
    render() {
        return (h("div", { class: "hs-card" },
            h("slot", null)));
    }
    static get is() { return "hs-card"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../scss/components/components.cards.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../scss/components/components.cards.css"]
    }; }
}
