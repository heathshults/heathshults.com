import { Component, Element, State, Prop } from '@stencil/core';

@Component({
  tag: 'hs-divider',
})
export class Divider {
  @Element()
  el: HTMLElement;

  @Prop()
  type: string = 'solid';

  @State()
  content: boolean;

  componentWillLoad() {
    this.content = !!this.el.innerHTML;
  }

  render() {
    const typeClass = this.type ? `c-divider--${this.type}` : '';
    return (
      <div class={`c-divider ${typeClass}`}>
        {this.content && (
          <span class="hs-divider__content">
            <slot />
          </span>
        )}
      </div>
    );
  }
}
