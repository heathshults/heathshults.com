import { EventEmitter } from '../../stencil-public-runtime';
export declare class HSModal {
    elem: HTMLElement;
    ghost: boolean;
    full: boolean;
    open: boolean;
    dismissible: boolean;
    winHeight: any;
    overlay: any;
    _isOpen: boolean;
    onClose: EventEmitter;
    close(): Promise<void>;
    componentWillLoad(): void;
    handleOverlay(): void;
    show(): Promise<void>;
    isOpen(): Promise<boolean>;
    dismiss(): void;
    render(): any[];
}
