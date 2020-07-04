import { Component, h } from '@stencil/core';

@Component({
  tag: 'hs-card',
  styleUrl: '../../scss/components/components.cards.scss',
  shadow: true
})
export class HSCard {
  render() {
    return (
      <div class="hs-card">
        <slot />
      </div>
    );
  }
}
