import { Component } from '@stencil/core';

@Component({
  tag: 'hs-media-body',
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
