/**
 * HSModal Class
 */
declare class HSModal extends HTMLDivElement {
    config: any;
    openTrigger: any;
    modalDiv: HTMLElement;
    myHSModalContent: any;
    containerDiv: any;
    myModalContent: any;
    /**
     * Constructor
     *
     * @param openTrigger The element that will trigger opening the modal.
     * @param options Options that will override defaults.
     */
    constructor(openTrigger: HTMLElement, options: {
        modalTitle: string;
        onAfter: (() => void) | (() => void);
        onBefore: (() => void) | (() => void);
    });
    bindEvents(): void;
    open(): void;
    close(e: {
        target: {
            id: string;
        };
        type: string;
    }): boolean;
    render(): void;
    htmlTemplate(): string;
}
declare const modalOneTrigger: HTMLElement;
declare const modalTwoTrigger: HTMLElement;
declare const header: HTMLCollectionOf<HTMLElement>;
