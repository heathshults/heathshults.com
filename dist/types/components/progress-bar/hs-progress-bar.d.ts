import { EventEmitter } from '../../stencil-public-runtime';
export declare class HSProgressBar {
    type: string;
    value: number;
    min: number;
    max: number;
    onChange: EventEmitter;
    watchValue(value: boolean, oldValue: boolean): void;
    render(): any;
}
