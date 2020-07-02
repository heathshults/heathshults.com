import { Component } from '@stencil/core';

@Component({
  tag: 'hs-address',
})
export class Address {
  render() {
    return (
      <address class="hs-address">
        <slot />
      </address>
    );
  }
}
