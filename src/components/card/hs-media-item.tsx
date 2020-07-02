import { Component } from '@stencil/core';

@Component({
  tag: 'hs-media-item',
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
