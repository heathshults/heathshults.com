import { Component, Element, Event, Listen, Prop, h } from '@stencil/core';
export class HSProgress {
    constructor() {
        this.size = '';
    }
    onChangeBar(ev) {
        const progress = this.element.children[0];
        const value = ev.detail;
        const bar = ev.target;
        const idx = [].indexOf.call(progress.children, bar);
        this.onNotSame.emit(Object.assign({ idx }, value));
    }
    render() {
        const sizeClass = this.size ? `u-${this.size}` : '';
        const roundedClass = this.rounded ? `hs-progress--rounded` : '';
        return (h("div", { class: `hs-progress ${roundedClass} ${sizeClass}` },
            h("slot", null)));
    }
    static get is() { return "hs-progress"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../scss/components/components.progress.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../scss/components/components.progress.css"]
    }; }
    static get properties() { return {
        "rounded": {
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
            "attribute": "rounded",
            "reflect": false
        },
        "size": {
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
            "attribute": "size",
            "reflect": false,
            "defaultValue": "''"
        }
    }; }
    static get events() { return [{
            "method": "onNotSame",
            "name": "change",
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
    static get elementRef() { return "element"; }
    static get listeners() { return [{
            "name": "changebar",
            "method": "onChangeBar",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
