import { Component, h } from '@stencil/core';

@Component({
  tag: 'hs-card-footer',
  styleUrl: '../../scss/components/components.cards.scss',
  shadow: true
})
export class HSCardFooter {
  render() {
    return (
      <footer class="hs-card__footer">
        <slot />
      </footer>
    );
  }
}
