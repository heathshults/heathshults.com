import { Component } from '@stencil/core';

@Component({
  tag: 'hs-address-heading',
})
export class AddressHeading {
  render() {
    return (
      <span class="hs-address__heading">
        <slot />
      </span>
    );
  }
}
