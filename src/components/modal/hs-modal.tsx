import { Component, Event, EventEmitter, Prop, Method, State, Element, h } from '@stencil/core';

@Component({
  tag: 'hs-modal',
  styleUrl: '../../scss/components/objects.modals.scss',
  shadow: true
})
export class HSModal {
  @Element()
  elem: HTMLElement;

  @Prop()
  ghost: boolean = false;

  @Prop()
  full: boolean = false;

  @Prop()
  open: boolean = false;

  @Prop()
  dismissible: boolean = false;

  @State() _isOpen: boolean = false;

  @Event({ eventName: 'close' }) onClose: EventEmitter;

  @Method() async close() {
    this._isOpen = false;
    this.onClose.emit();
  }

  @Method() async show() {
    this._isOpen = true;
  }

  @Method() async isOpen() {
    return this._isOpen;
  }

  componentWillLoad() {
    this._isOpen = this.open;
  }

  dismiss() {
    if (this.dismissible) this.close();
  }

  render() {
    const ghostClass = this.ghost ? `hs-modal--ghost` : '';
    const fullClass = this.full ? `hs-modal--full` : '';
    const modalIsOpenClass = this._isOpen ? 'hs-modal--visible' : '';
    const overlayIsOpenClass = this._isOpen ? 'hs-modal-backdrop--visible' : ''; 

    return [

        <div id="overlay" aria-hidden onClick={() => this.dismiss()} class={`hs-modal-backdrop ${overlayIsOpenClass}`} ></div>,
        
        <div role="dialog" class={`hs-modal ${ghostClass} ${fullClass} ${modalIsOpenClass}`}>
          
          {this.dismissible && (
            <button type="button" class="hs-button hs-button--close" onClick={() => this.close()}>
              &times;
            </button>
          )}
         
          <slot />

        </div>

    ];
  }
}
