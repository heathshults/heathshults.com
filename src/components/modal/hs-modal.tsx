import { Component, Event, EventEmitter, Prop, Method, State, Element } from '@stencil/core';

@Component({
  tag: 'hs-modal',
})
export class Modal {
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

  @State()
  _isOpen: boolean = false;

  @Event({ eventName: 'close' })
  onClose: EventEmitter;

  @Method()
  close() {
    this._isOpen = false;
    this.onClose.emit();
  }

  @Method()
  show() {
    this._isOpen = true;
  }

  @Method()
  async isOpen() {
    return this._isOpen;
  }

  componentWillLoad() {
    this._isOpen = this.open;
  }

  dismiss() {
    if (this.dismissible) this.close();
  }

  render() {
    const ghostClass = this.ghost ? `o-modal--ghost` : '';
    const fullClass = this.full ? `o-modal--full` : '';
    const modalIsOpenClass = this._isOpen ? 'o-modal--visible' : '';
    const overlayIsOpenClass = this._isOpen ? 'c-overlay--visible' : '';

    return [
      <div aria-hidden onClick={() => this.dismiss()} class={`c-overlay hs-overlay--fullpage ${overlayIsOpenClass}`} />,
      <div role="dialog" class={`o-modal ${ghostClass} ${fullClass} ${modalIsOpenClass}`}>
        {this.dismissible && (
          <button type="button" class="hs-button hs-button--close" onClick={() => this.close()}>
            &times;
          </button>
        )}
        <slot />
      </div>,
    ];
  }
}
