import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'hs-tab',
  styleUrl: '../../scss/components/components.tabs.scss',
  shadow: true
})
export class Tab {
  @Prop()
  header: string;

  @Prop()
  disabled: boolean;

  @Prop()
  open: boolean;

  @Prop()
  type: string;

  render() {
    const typeClass = this.type ? `hs-tabs__tab--${this.type}` : '';

    return (
      <div role="tabpanel" hidden={!this.open} class={`hs-tabs__tab ${typeClass}`}>
        <slot />
      </div>
    );
  }
}
