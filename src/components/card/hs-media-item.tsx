import { Component, h } from '@stencil/core';

@Component({
  tag: 'hs-media-item',
  styleUrl: '../../scss/components/components.cards.scss',
  shadow: true
})
export class HSMediaItem {
  render() {
    return (
      <div class="hs-card__item hs-media">
        <slot />
      </div>
    );
  }
}
