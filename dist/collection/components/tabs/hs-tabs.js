import { Component, Element, Event, Method, State, h } from '@stencil/core';
export class Tabs {
    componentWillLoad() {
        this.tabs = Array.from(this.elem.querySelectorAll('hs-tab'));
    }
    async currentTab() {
        return this.tabs.findIndex((tab) => tab.open);
    }
    async openTab(tabIndex) {
        if (!this.tabs[tabIndex].disabled) {
            this.tabs = this.tabs.map((tab) => {
                tab.open = false;
                return tab;
            });
            this.tabs[tabIndex].open = true;
            this.onNowDifferent.emit({ idx: tabIndex });
        }
    }
    render() {
        return (h("div", { class: "hs-tabs" },
            h("div", { role: "tablist", class: "hs-tabs" },
                h("div", { class: "hs-tabs__nav" },
                    h("div", { class: "hs-tabs__headings" }, this.tabs.map((tab, i) => {
                        const openClass = tab.open ? 'hs-tab-heading--active' : '';
                        const typeClass = tab.type ? `hs-tab-heading--${tab.type}` : '';
                        return (h("button", { role: "tab", disabled: tab.disabled, class: `hs-tab-heading ${typeClass} ${openClass}`, onClick: () => this.openTab(i) }, tab.header));
                    }))),
                h("slot", null))));
    }
    static get is() { return "hs-tabs"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../scss/components/components.cards.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../scss/components/components.cards.css"]
    }; }
    static get states() { return {
        "tabs": {}
    }; }
    static get events() { return [{
            "method": "onNowDifferent",
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
    static get methods() { return {
        "currentTab": {
            "complexType": {
                "signature": "() => Promise<number>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<number>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        },
        "openTab": {
            "complexType": {
                "signature": "(tabIndex: number) => Promise<void>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        }
    }; }
    static get elementRef() { return "elem"; }
}
