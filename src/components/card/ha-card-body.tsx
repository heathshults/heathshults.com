import { Component, h } from '@stencil/core';

@Component({
  tag: 'hs-card-body',
  styleUrl: '../../scss/components/components.cards.scss',
  shadow: true
})
export class HSCardBody {
  render() {
    return (
      <div class="hs-card__body">
        <slot />
      </div>
    );
  }
}
