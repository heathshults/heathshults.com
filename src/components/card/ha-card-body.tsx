import { Component } from '@stencil/core';

@Component({
  tag: 'hs-card-body',
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
