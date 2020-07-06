import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'hs-card-footer',
  styleUrl: '../../scss/components/components.cards.scss',
  shadow: true
})
export class HSCardFooter {
  @Prop() colorTone: string;
  @Prop() colorToneClass: string;
  render() {
    // if (typeof this.colorTone === 'undefined' || typeof this.colorTone === null || this.colorTone === 'light') {
    //   this.colorToneClass = 'light'
    // }
    // if (this.colorTone === 'dark') {
    //   this.colorToneClass = 'dark'
    // }
    typeof this.colorTone === 'undefined' || typeof this.colorTone === null || this.colorTone === 'light' ? this.colorToneClass = 'light' :
      this.colorTone === 'dark' ? this.colorToneClass = 'dark' : this.colorToneClass = 'light';

    return (
      <footer class={`hs-card__footer ${this.colorToneClass}`}>
        <slot />
      </footer>
    );
  }
}
