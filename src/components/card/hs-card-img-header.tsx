import { Component, Element, Prop, h } from '@stencil/core';

@Component({
  tag: 'hs-card-img-header',
  styleUrl: '../../scss/components/components.cards.scss',
  shadow: true
})
export class HSCardImgHeader {
  @Element() imgHeaderElem: HTMLDivElement;

  @Prop() cardHeader: any;
  @Prop() overlay: any;
  @Prop() imgElem: HTMLImageElement;
  @Prop() imgPath: string;

  componentWillLoad() {
    this.cardHeader = document.getElementById('imgHeader');
    this.imgElem = this.cardHeader.querySelector('img');
    this.imgElem.src = this.imgPath;
    this.overlay = this.cardHeader.querySelector('#imgHeaderOverlay');
    this.overlay.addEventListener('click', ev => {
      ev.preventDefault();
      alert('hi');
    })
  }

  render() {
   

    return (
      <header id="imgHeader" class="hs-card__img-header">
        <a id="imgHeaderOverlay" class="hs-img-header__overlay" href="#">
          <img src={this.imgPath} class="hs-img-header-img" alt="header image" width="100%" />
        </a>
      </header>
    );
  }
}
