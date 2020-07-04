import { Component, h } from '@stencil/core';

@Component({
  tag: 'hs-media-body',
  styleUrl: '../../scss/components/components.cards.scss',
  shadow: true
})
export class HSMediaBody {
  render() {
    return (
      <div class="hs-media__body">
        <slot />
      </div>
    );
  }
}
