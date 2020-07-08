import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'hs-card',
  styleUrl: '../../scss/components/components.cards.scss',
  shadow: true
})
export class HSCard {
  @Prop() colorTone: string;
  render() {
    return (
      <div class={`hs-card ${this.colorTone}`}>
        <slot />
      </div>
    );
  }
}
