import { Component, h } from '@stencil/core';
export class HSMediaItem {
    render() {
        return (h("div", { class: "hs-card__item hs-media" },
            h("slot", null)));
    }
    static get is() { return "hs-media-item"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../scss/components/components.cards.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../scss/components/components.cards.css"]
    }; }
}
