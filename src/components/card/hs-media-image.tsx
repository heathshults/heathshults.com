import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'hs-media-image',
})
export class HSMediaImage {
  @Prop()
  src: string;

  @Prop()
  alt: string;

  render() {
    return (
      <div class="hs-media__image">
        <img class="hs-image" alt={this.alt} src={this.src} />
      </div>
    );
  }
}
