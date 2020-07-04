import { Component, h } from '@stencil/core';

@Component({
  tag: 'hs-card-header',
  styleUrl: '../../scss/components/components.cards.scss',
  shadow: true
})
export class HSCardHeader {
  render() {
    return (
      <header class="hs-card__header">
        <slot />
      </header>
    );
  }
}
