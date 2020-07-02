import { Component } from '@stencil/core';

@Component({
  tag: 'hs-card-footer',
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
