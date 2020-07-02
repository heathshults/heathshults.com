import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'hs-panel',
})
export class Panel {
  @Prop()
  height: number = 0;

  render() {
    return (
      <div class="hs-panel-container" style={{ height: `${this.height}px` }}>
        <div class="hs-panel">
          <slot />
        </div>
      </div>
    );
  }
}
