import { EventEmitter } from '../../stencil-public-runtime';
export declare class HSProgress {
    private element;
    rounded: boolean;
    size: string;
    onNotSame: EventEmitter;
    onChangeBar(ev: any): void;
    render(): any;
}
