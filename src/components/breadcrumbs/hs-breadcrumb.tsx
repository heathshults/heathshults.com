import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'hs-breadcrumb',
})
export class Breadcrumb {
  @Prop()
  href: string;

  render() {
    return (
      <li class="hs-breadcrumbs__crumb">
        {this.href ? (
          <a class="hs-link" href={this.href}>
            <slot />
          </a>
        ) : (
          <slot />
        )}
      </li>
    );
  }
}
