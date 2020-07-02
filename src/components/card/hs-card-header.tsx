import { Component } from '@stencil/core';

@Component({
  tag: 'hs-card-header',
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
