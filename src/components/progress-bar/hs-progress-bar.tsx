import { Component, Event, EventEmitter, Prop, Watch, h } from '@stencil/core';

@Component({
  tag: 'hs-progress-bar',
  styleUrl: '../../scss/components/components.progress.scss',
  shadow: true
})
export class HSProgressBar {
  @Prop() type: string;

  @Prop() value: number;

  @Prop() min: number = 0;

  @Prop() max: number = 100;

  @Event({ eventName: 'changebar' })
  onChange: EventEmitter;

  @Watch('value')
  watchValue(value: boolean, oldValue: boolean) {
    this.onChange.emit({ value, oldValue });
  }

  render() {
    const typeClass = this.type ? `hs-progress__bar--${this.type}` : '';
    const percentage = ((this.value - this.min) / (this.max - this.min)) * 100;

    return (
      <div
        role="progressbar"
        aria-valuenow={this.value}
        aria-valuemin={this.min}
        aria-valuemax={this.max}
        style={{ width: `${percentage}%` }}
        class={`hs-progress__bar ${typeClass}`}>
        <slot />
      </div>
    );
  }
}
