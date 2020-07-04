import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'hs-timeline',
  styleUrl: '../../scss/components/components.timelines.scss',
  shadow: true
})
export class Timeline {
  @Prop()
  alternate: boolean;
  @Prop()
  loading: boolean;

  render() {
    const alternateClass = this.alternate ? 'o-timeline--alternate' : '';
    const loadingClass = this.loading ? 'o-timeline--loading' : '';

    return (
      <ol class={`o-timeline ${alternateClass} ${loadingClass}`}>
        <slot />
      </ol>
    );
  }
}
