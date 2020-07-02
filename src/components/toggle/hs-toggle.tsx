import { Component, Event, EventEmitter, Method, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'hs-toggle',
})
export class Toggle {
  @Prop()
  type: string;

  @Prop()
  toggled: boolean = false;

  @State()
  _toggled: boolean = false;

  @Event({ eventName: 'change' })
  onChange: EventEmitter;

  componentDidLoad() {
    this._toggled = this.toggled;
  }

  @Method()
  async isToggled() {
    return this._toggled;
  }

  @Watch('toggled')
  toggle() {
    this._toggled = !this._toggled;
    this.onChange.emit(this._toggled);
  }

  handleToggle(e) {
    e.preventDefault();
    this.toggle();
  }

  render() {
    const type = this.type ? `c-toggle--${this.type}` : '';

    return (
      <label class={`c-toggle ${type}`} onClick={(e) => this.handleToggle(e)}>
        <input type="checkbox" aria-checked={this._toggled.toString()} checked={this._toggled} />
        <div class="hs-toggle__track">
          <div class="hs-toggle__handle" />
        </div>
        <slot />
      </label>
    );
  }
}
