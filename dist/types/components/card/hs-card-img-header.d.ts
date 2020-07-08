import { EventEmitter } from '../../stencil-public-runtime';
export declare class HSCardImgHeader {
    imgHeaderEl: HTMLDivElement;
    cardHeader: any;
    overlay: HTMLLinkElement;
    imgElem: any;
    imgPath: string;
    imgWidth?: string;
    imgHeight?: string;
    clickTarget?: string;
    modalLancher: EventEmitter;
    launchModal: EventEmitter;
    launchModalEvent(event: UIEvent): void;
    launchModalHandler(target: string): void;
    componentWillLoad(): void;
    render(): any;
}
