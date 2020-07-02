import { Component, Event, EventEmitter, Prop, Method, State } from '@stencil/core';

@Component({
  tag: 'hs-drawer',
})
export class Drawer {
  @Prop()
  open: boolean = false;

  @Prop()
  dismissible: boolean = false;

  @Prop()
  position: string = 'bottom';

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
    const drawerIsOpenClass = this._isOpen ? 'o-drawer--visible' : '';
    const overlayIsOpenClass = this._isOpen ? 'c-overlay--visible' : '';

    return [
      <div
        aria-hidden="true"
        onClick={() => this.dismiss()}
        class={`c-overlay hs-overlay--fullpage ${overlayIsOpenClass}`}
      />,
      <aside aria-expanded={this.isOpen.toString()} class={`o-drawer hs-drawer--${this.position} ${drawerIsOpenClass}`}>
        <slot />
      </aside>,
    ];
  }
}
