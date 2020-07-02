import { Component } from '@stencil/core';

@Component({
  tag: 'hs-breadcrumbs',
})
export class Breadcrumbs {
  render() {
    return (
      <nav>
        <ol class="hs-breadcrumbs">
          <slot />
        </ol>
      </nav>
    );
  }
}
