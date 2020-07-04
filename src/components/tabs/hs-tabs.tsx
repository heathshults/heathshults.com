import { Component, Element, Event, EventEmitter, Method, State, h } from '@stencil/core';

@Component({
  tag: 'hs-tabs',
  styleUrl: '../../scss/components/components.cards.scss',
  shadow: true
})
export class Tabs {
  @Element()
  elem: HTMLElement;

  @State()
  tabs: any[];

  @Event({ eventName: 'change' })
  onNowDifferent: EventEmitter;

  componentWillLoad() {
    this.tabs = Array.from(this.elem.querySelectorAll('hs-tab'));
  }

  @Method()
  async currentTab() {
    return this.tabs.findIndex((tab) => tab.open);
  }

  @Method()
  async openTab(tabIndex: number) {
    if (!this.tabs[tabIndex].disabled) {
      this.tabs = this.tabs.map((tab) => {
        tab.open = false;
        return tab;
      });
      this.tabs[tabIndex].open = true;
      this.onNowDifferent.emit({ idx: tabIndex });
    }
  }

  render() {
    return (
      <div class="hs-tabs">
        <div role="tablist" class="hs-tabs">
          <div class="hs-tabs__nav">
            <div class="hs-tabs__headings">
              {this.tabs.map((tab, i: number) => {
                const openClass = tab.open ? 'hs-tab-heading--active' : '';
                const typeClass = tab.type ? `hs-tab-heading--${tab.type}` : '';

                return (
                  <button
                    role="tab"
                    disabled={tab.disabled}
                    class={`hs-tab-heading ${typeClass} ${openClass}`}
                    onClick={() => this.openTab(i)}>
                    {tab.header}
                  </button>
                );
              })}
            </div>
          </div>
          <slot />
        </div>
      </div>
    );
  }
}
