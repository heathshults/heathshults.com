import { Component, Event, Prop, Watch, h } from '@stencil/core';
export class HSProgressBar {
    constructor() {
        this.min = 0;
        this.max = 100;
    }
    watchValue(value, oldValue) {
        this.onChange.emit({ value, oldValue });
    }
    render() {
        const typeClass = this.type ? `hs-progress__bar--${this.type}` : '';
        const percentage = ((this.value - this.min) / (this.max - this.min)) * 100;
        return (h("div", { role: "progressbar", "aria-valuenow": this.value, "aria-valuemin": this.min, "aria-valuemax": this.max, style: { width: `${percentage}%` }, class: `hs-progress__bar ${typeClass}` },
            h("slot", null)));
    }
    static get is() { return "hs-progress-bar"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../scss/components/components.progress.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../scss/components/components.progress.css"]
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
        "value": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "value",
            "reflect": false
        },
        "min": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "min",
            "reflect": false,
            "defaultValue": "0"
        },
        "max": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "max",
            "reflect": false,
            "defaultValue": "100"
        }
    }; }
    static get events() { return [{
            "method": "onChange",
            "name": "changebar",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get watchers() { return [{
            "propName": "value",
            "methodName": "watchValue"
        }]; }
}
