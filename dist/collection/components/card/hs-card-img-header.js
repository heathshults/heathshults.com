import { Component, Element, Prop, h } from '@stencil/core';
export class HSCardImgHeader {
    componentWillLoad() {
        this.cardHeader = document.getElementById('imgHeader');
        this.imgElem = this.cardHeader.querySelector('img');
        this.imgElem.src = this.imgPath;
        this.overlay = this.cardHeader.querySelector('#imgHeaderOverlay');
        this.overlay.addEventListener('click', ev => {
            ev.preventDefault();
            alert('hi');
        });
    }
    render() {
        return (h("header", { id: "imgHeader", class: "hs-card__img-header" },
            h("a", { id: "imgHeaderOverlay", class: "hs-img-header__overlay", href: "#" },
                h("img", { src: this.imgPath, class: "hs-img-header-img", alt: "header image", width: "100%" }))));
    }
    static get is() { return "hs-card-img-header"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["../../scss/components/components.cards.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["../../scss/components/components.cards.css"]
    }; }
    static get properties() { return {
        "cardHeader": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "card-header",
            "reflect": false
        },
        "overlay": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "overlay",
            "reflect": false
        },
        "imgElem": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "HTMLImageElement",
                "resolved": "HTMLImageElement",
                "references": {
                    "HTMLImageElement": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        },
        "imgPath": {
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
            "attribute": "img-path",
            "reflect": false
        }
    }; }
    static get elementRef() { return "imgHeaderElem"; }
}
