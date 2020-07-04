import { Component, Element, Event, EventEmitter, Listen, Prop, h } from '@stencil/core';

@Component({
  tag: 'hs-progress',
  styleUrl: '../../scss/components/components.progress.scss',
  shadow: true
})
export class HSProgress {
  @Element() private element: HTMLElement;

  @Prop() rounded: boolean;

  @Prop() size: string = '';

  @Event({ eventName: 'change' }) onNotSame: EventEmitter;

  @Listen('changebar') onChangeBar(ev) {
    const progress = this.element.children[0];
    const value = ev.detail;
    const bar = ev.target;
    const idx = [].indexOf.call(progress.children, bar);
    this.onNotSame.emit({ idx, ...value });
  }

  render() {
    const sizeClass = this.size ? `u-${this.size}` : '';
    const roundedClass = this.rounded ? `hs-progress--rounded` : '';

    return (
      <div class={`hs-progress ${roundedClass} ${sizeClass}`}>
        <slot />
      </div>
    );
  }
}
