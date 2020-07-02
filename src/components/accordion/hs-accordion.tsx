import { Component, Element, Event, EventEmitter, Listen } from '@stencil/core';

@Component({
  tag: 'hs-accordion',
})
export class Accordion {
  @Element()
  private element: HTMLElement;

  @Event({ eventName: 'toggle' })
  onToggle: EventEmitter;

  @Listen('togglepane')
  onTogglePane(ev) {
    const accordion = this.element.children[0];
    const open = ev.detail;
    const pane = ev.target;
    const idx = [].indexOf.call(accordion.children, pane);
    this.onToggle.emit({ idx, open });
  }

  render() {
    return (
      <div class="hs-card hs-card--accordion">
        <slot />
      </div>
    );
  }
}
