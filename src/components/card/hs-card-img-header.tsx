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
  @Prop() imgElem: any;
  @Prop() imgPath: string;
  @Prop() imgWidth?: string = '100%';
  @Prop() imgHeight?: string = '260px';

  componentWillLoad() {
    this.cardHeader = document.getElementById('imgHeader');
    this.imgElem = this.cardHeader.getElementById('#hsHeaderImg');
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
          <img id="hsHeaderImg" src={this.imgPath} class="hs-img-header-img" alt="header image" width={this.imgWidth} height={this.imgHeight} />
        </a>
      </header>
    );
  }
}
