import { Component, Prop, h } from '@stencil/core';
export class TimelineItem {
    render() {
        const typeClass = this.type ? `hs-timeline-item--${this.type}` : '';
        const lastClass = this.last ? `hs-timeline-item--last` : '';
        const leftClass = this.left ? `hs-timeline-item--left` : '';
        const loadingClass = this.loading && !this.last ? `hs-timeline-item--loading` : '';
        return (h("li", { class: `hs-timeline-item ${typeClass} ${leftClass} ${lastClass} ${loadingClass}` },
            h("div", { class: "hs-timeline-item__body" },
                h("slot", null))));
    }
    static get is() { return "hs-timeline-item"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../scss/components/components.timelines.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../scss/components/components.timelines.css"]
    }; }
    static get properties() { return {
        "type": {
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
            "attribute": "type",
            "reflect": false
        },
        "last": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "last",
            "reflect": false
        },
        "left": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "left",
            "reflect": false
        },
        "loading": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "loading",
            "reflect": false
        }
    }; }
}
