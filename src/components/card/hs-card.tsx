import { Component } from '@stencil/core';

@Component({
  tag: 'hs-card',
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
