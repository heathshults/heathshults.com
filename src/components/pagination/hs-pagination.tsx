import { Component, Event, EventEmitter, Method, Prop, State } from '@stencil/core';

@Component({
  tag: 'hs-pagination',
})
export class Pagination {
  @Prop()
  page: number = 1;

  @Prop()
  pages: number = 1;

  @State()
  _currentPage: number;

  @Event({ eventName: 'change' })
  onChange: EventEmitter;

  @Method()
  goToPage(page: number) {
    if (page > 0 && page <= this.pages) {
      this._currentPage = page;
      this.onChange.emit(this._currentPage);
    }
  }

  @Method()
  async currentPage() {
    return this._currentPage;
  }

  componentWillLoad() {
    this._currentPage = this.page;
  }

  render() {
    return (
      <nav class="hs-pagination">
        <button
          class="hs-pagination__control"
          onClick={() => this.goToPage(this._currentPage - 1)}
          disabled={this._currentPage === 1}>
          &lsaquo;
        </button>
        <div class="hs-pagination__pages">
          {this._currentPage > 1 && (
            <button onClick={() => this.goToPage(this._currentPage - 1)} class="hs-pagination__control">
              {this._currentPage - 1}
            </button>
          )}
          <button class="hs-pagination__control" aria-current>
            {this._currentPage}
          </button>
          {this._currentPage < this.pages && (
            <button onClick={() => this.goToPage(this._currentPage + 1)} class="hs-pagination__control">
              {this._currentPage + 1}
            </button>
          )}
        </div>
        <button
          class="hs-pagination__control"
          onClick={() => this.goToPage(this._currentPage + 1)}
          disabled={this._currentPage === this.pages}>
          &rsaquo;
        </button>
      </nav>
    );
  }
}
