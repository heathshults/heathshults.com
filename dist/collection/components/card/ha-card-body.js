import { Component, h } from '@stencil/core';
export class HSCardBody {
    render() {
        return (h("div", { class: "hs-card__body" },
            h("slot", null)));
    }
    static get is() { return "hs-card-body"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../scss/components/components.cards.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../scss/components/components.cards.css"]
    }; }
}
