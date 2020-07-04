import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'hs-timeline-item',
  styleUrl: '../../scss/components/components.timelines.scss',
  shadow: true
})
export class TimelineItem {
  @Prop()
  type: string;
  @Prop()
  last: boolean;
  @Prop()
  left: boolean;
  @Prop()
  loading: boolean;

  render() {
    const typeClass = this.type ? `hs-timeline-item--${this.type}` : '';
    const lastClass = this.last ? `hs-timeline-item--last` : '';
    const leftClass = this.left ? `hs-timeline-item--left` : '';
    const loadingClass = this.loading && !this.last ? `hs-timeline-item--loading` : '';

    return (
      <li class={`hs-timeline-item ${typeClass} ${leftClass} ${lastClass} ${loadingClass}`}>
        <div class="hs-timeline-item__body">
          <slot />
        </div>
      </li>
    );
  }
}
