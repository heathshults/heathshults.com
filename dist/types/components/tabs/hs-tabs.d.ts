import { EventEmitter } from '../../stencil-public-runtime';
export declare class Tabs {
    elem: HTMLElement;
    tabs: any[];
    onNowDifferent: EventEmitter;
    componentWillLoad(): void;
    currentTab(): Promise<number>;
    openTab(tabIndex: number): Promise<void>;
    render(): any;
}
