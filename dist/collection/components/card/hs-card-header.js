import { Component, h } from '@stencil/core';
export class HSCardHeader {
    render() {
        return (h("header", { class: "hs-card__header" },
            h("slot", null)));
    }
    static get is() { return "hs-card-header"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../scss/components/components.cards.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../scss/components/components.cards.css"]
    }; }
}
