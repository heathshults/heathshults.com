/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface HsCard {
    }
    interface HsCardBody {
    }
    interface HsCardFooter {
    }
    interface HsCardHeader {
    }
    interface HsCardImgHeader {
        "cardHeader": any;
        "imgElem": HTMLImageElement;
        "imgPath": string;
        "overlay": any;
    }
    interface HsMediaBody {
    }
    interface HsMediaImage {
        "alt": string;
        "src": string;
    }
    interface HsMediaItem {
    }
    interface HsModal {
        "close": () => Promise<void>;
        "dismissible": boolean;
        "full": boolean;
        "ghost": boolean;
        "isOpen": () => Promise<boolean>;
        "open": boolean;
        "show": () => Promise<void>;
    }
    interface HsProgress {
        "rounded": boolean;
        "size": string;
    }
    interface HsProgressBar {
        "max": number;
        "min": number;
        "type": string;
        "value": number;
    }
    interface HsSticky {
        "top": number;
    }
    interface HsTab {
        "disabled": boolean;
        "header": string;
        "open": boolean;
        "type": string;
    }
    interface HsTabs {
        "currentTab": () => Promise<number>;
        "openTab": (tabIndex: number) => Promise<void>;
    }
    interface HsTimeline {
        "alternate": boolean;
        "loading": boolean;
    }
    interface HsTimelineItem {
        "last": boolean;
        "left": boolean;
        "loading": boolean;
        "type": string;
    }
}
declare global {
    interface HTMLHsCardElement extends Components.HsCard, HTMLStencilElement {
    }
    var HTMLHsCardElement: {
        prototype: HTMLHsCardElement;
        new (): HTMLHsCardElement;
    };
    interface HTMLHsCardBodyElement extends Components.HsCardBody, HTMLStencilElement {
    }
    var HTMLHsCardBodyElement: {
        prototype: HTMLHsCardBodyElement;
        new (): HTMLHsCardBodyElement;
    };
    interface HTMLHsCardFooterElement extends Components.HsCardFooter, HTMLStencilElement {
    }
    var HTMLHsCardFooterElement: {
        prototype: HTMLHsCardFooterElement;
        new (): HTMLHsCardFooterElement;
    };
    interface HTMLHsCardHeaderElement extends Components.HsCardHeader, HTMLStencilElement {
    }
    var HTMLHsCardHeaderElement: {
        prototype: HTMLHsCardHeaderElement;
        new (): HTMLHsCardHeaderElement;
    };
    interface HTMLHsCardImgHeaderElement extends Components.HsCardImgHeader, HTMLStencilElement {
    }
    var HTMLHsCardImgHeaderElement: {
        prototype: HTMLHsCardImgHeaderElement;
        new (): HTMLHsCardImgHeaderElement;
    };
    interface HTMLHsMediaBodyElement extends Components.HsMediaBody, HTMLStencilElement {
    }
    var HTMLHsMediaBodyElement: {
        prototype: HTMLHsMediaBodyElement;
        new (): HTMLHsMediaBodyElement;
    };
    interface HTMLHsMediaImageElement extends Components.HsMediaImage, HTMLStencilElement {
    }
    var HTMLHsMediaImageElement: {
        prototype: HTMLHsMediaImageElement;
        new (): HTMLHsMediaImageElement;
    };
    interface HTMLHsMediaItemElement extends Components.HsMediaItem, HTMLStencilElement {
    }
    var HTMLHsMediaItemElement: {
        prototype: HTMLHsMediaItemElement;
        new (): HTMLHsMediaItemElement;
    };
    interface HTMLHsModalElement extends Components.HsModal, HTMLStencilElement {
    }
    var HTMLHsModalElement: {
        prototype: HTMLHsModalElement;
        new (): HTMLHsModalElement;
    };
    interface HTMLHsProgressElement extends Components.HsProgress, HTMLStencilElement {
    }
    var HTMLHsProgressElement: {
        prototype: HTMLHsProgressElement;
        new (): HTMLHsProgressElement;
    };
    interface HTMLHsProgressBarElement extends Components.HsProgressBar, HTMLStencilElement {
    }
    var HTMLHsProgressBarElement: {
        prototype: HTMLHsProgressBarElement;
        new (): HTMLHsProgressBarElement;
    };
    interface HTMLHsStickyElement extends Components.HsSticky, HTMLStencilElement {
    }
    var HTMLHsStickyElement: {
        prototype: HTMLHsStickyElement;
        new (): HTMLHsStickyElement;
    };
    interface HTMLHsTabElement extends Components.HsTab, HTMLStencilElement {
    }
    var HTMLHsTabElement: {
        prototype: HTMLHsTabElement;
        new (): HTMLHsTabElement;
    };
    interface HTMLHsTabsElement extends Components.HsTabs, HTMLStencilElement {
    }
    var HTMLHsTabsElement: {
        prototype: HTMLHsTabsElement;
        new (): HTMLHsTabsElement;
    };
    interface HTMLHsTimelineElement extends Components.HsTimeline, HTMLStencilElement {
    }
    var HTMLHsTimelineElement: {
        prototype: HTMLHsTimelineElement;
        new (): HTMLHsTimelineElement;
    };
    interface HTMLHsTimelineItemElement extends Components.HsTimelineItem, HTMLStencilElement {
    }
    var HTMLHsTimelineItemElement: {
        prototype: HTMLHsTimelineItemElement;
        new (): HTMLHsTimelineItemElement;
    };
    interface HTMLElementTagNameMap {
        "hs-card": HTMLHsCardElement;
        "hs-card-body": HTMLHsCardBodyElement;
        "hs-card-footer": HTMLHsCardFooterElement;
        "hs-card-header": HTMLHsCardHeaderElement;
        "hs-card-img-header": HTMLHsCardImgHeaderElement;
        "hs-media-body": HTMLHsMediaBodyElement;
        "hs-media-image": HTMLHsMediaImageElement;
        "hs-media-item": HTMLHsMediaItemElement;
        "hs-modal": HTMLHsModalElement;
        "hs-progress": HTMLHsProgressElement;
        "hs-progress-bar": HTMLHsProgressBarElement;
        "hs-sticky": HTMLHsStickyElement;
        "hs-tab": HTMLHsTabElement;
        "hs-tabs": HTMLHsTabsElement;
        "hs-timeline": HTMLHsTimelineElement;
        "hs-timeline-item": HTMLHsTimelineItemElement;
    }
}
declare namespace LocalJSX {
    interface HsCard {
    }
    interface HsCardBody {
    }
    interface HsCardFooter {
    }
    interface HsCardHeader {
    }
    interface HsCardImgHeader {
        "cardHeader"?: any;
        "imgElem"?: HTMLImageElement;
        "imgPath"?: string;
        "overlay"?: any;
    }
    interface HsMediaBody {
    }
    interface HsMediaImage {
        "alt"?: string;
        "src"?: string;
    }
    interface HsMediaItem {
    }
    interface HsModal {
        "dismissible"?: boolean;
        "full"?: boolean;
        "ghost"?: boolean;
        "onClose"?: (event: CustomEvent<any>) => void;
        "open"?: boolean;
    }
    interface HsProgress {
        "onChange"?: (event: CustomEvent<any>) => void;
        "rounded"?: boolean;
        "size"?: string;
    }
    interface HsProgressBar {
        "max"?: number;
        "min"?: number;
        "onChangebar"?: (event: CustomEvent<any>) => void;
        "type"?: string;
        "value"?: number;
    }
    interface HsSticky {
        "top"?: number;
    }
    interface HsTab {
        "disabled"?: boolean;
        "header"?: string;
        "open"?: boolean;
        "type"?: string;
    }
    interface HsTabs {
        "onChange"?: (event: CustomEvent<any>) => void;
    }
    interface HsTimeline {
        "alternate"?: boolean;
        "loading"?: boolean;
    }
    interface HsTimelineItem {
        "last"?: boolean;
        "left"?: boolean;
        "loading"?: boolean;
        "type"?: string;
    }
    interface IntrinsicElements {
        "hs-card": HsCard;
        "hs-card-body": HsCardBody;
        "hs-card-footer": HsCardFooter;
        "hs-card-header": HsCardHeader;
        "hs-card-img-header": HsCardImgHeader;
        "hs-media-body": HsMediaBody;
        "hs-media-image": HsMediaImage;
        "hs-media-item": HsMediaItem;
        "hs-modal": HsModal;
        "hs-progress": HsProgress;
        "hs-progress-bar": HsProgressBar;
        "hs-sticky": HsSticky;
        "hs-tab": HsTab;
        "hs-tabs": HsTabs;
        "hs-timeline": HsTimeline;
        "hs-timeline-item": HsTimelineItem;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "hs-card": LocalJSX.HsCard & JSXBase.HTMLAttributes<HTMLHsCardElement>;
            "hs-card-body": LocalJSX.HsCardBody & JSXBase.HTMLAttributes<HTMLHsCardBodyElement>;
            "hs-card-footer": LocalJSX.HsCardFooter & JSXBase.HTMLAttributes<HTMLHsCardFooterElement>;
            "hs-card-header": LocalJSX.HsCardHeader & JSXBase.HTMLAttributes<HTMLHsCardHeaderElement>;
            "hs-card-img-header": LocalJSX.HsCardImgHeader & JSXBase.HTMLAttributes<HTMLHsCardImgHeaderElement>;
            "hs-media-body": LocalJSX.HsMediaBody & JSXBase.HTMLAttributes<HTMLHsMediaBodyElement>;
            "hs-media-image": LocalJSX.HsMediaImage & JSXBase.HTMLAttributes<HTMLHsMediaImageElement>;
            "hs-media-item": LocalJSX.HsMediaItem & JSXBase.HTMLAttributes<HTMLHsMediaItemElement>;
            "hs-modal": LocalJSX.HsModal & JSXBase.HTMLAttributes<HTMLHsModalElement>;
            "hs-progress": LocalJSX.HsProgress & JSXBase.HTMLAttributes<HTMLHsProgressElement>;
            "hs-progress-bar": LocalJSX.HsProgressBar & JSXBase.HTMLAttributes<HTMLHsProgressBarElement>;
            "hs-sticky": LocalJSX.HsSticky & JSXBase.HTMLAttributes<HTMLHsStickyElement>;
            "hs-tab": LocalJSX.HsTab & JSXBase.HTMLAttributes<HTMLHsTabElement>;
            "hs-tabs": LocalJSX.HsTabs & JSXBase.HTMLAttributes<HTMLHsTabsElement>;
            "hs-timeline": LocalJSX.HsTimeline & JSXBase.HTMLAttributes<HTMLHsTimelineElement>;
            "hs-timeline-item": LocalJSX.HsTimelineItem & JSXBase.HTMLAttributes<HTMLHsTimelineItemElement>;
        }
    }
}
