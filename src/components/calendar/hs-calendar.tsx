import { Component, Prop, State, Event } from '@stencil/core';
import { EventEmitter } from 'events';

@Component({
  tag: 'hs-calendar',
})
export class Calendar {
  @Prop()
  date: string;

  @Prop()
  type: string = 'brand';

  @Prop()
  multiple: boolean = false;

  @State()
  _date: Date = new Date();

  @State()
  _selectedDates: Array<Date> = [];

  @Event({ eventName: 'select' })
  onSelect: EventEmitter;

  days: Array<string> = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  months: Array<string> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  componentWillLoad() {
    const date = this.date || new Date();
    this._date = new Date(date);
    this._selectedDates = [...this._selectedDates, this._date];
  }

  getMonthName() {
    return this.months[this._date.getMonth()];
  }

  getFirstDay() {
    return new Date(this._date.getFullYear(), this._date.getMonth(), 1).getDay();
  }

  getLastDay() {
    return new Date(this._date.getFullYear(), this._date.getMonth() + 1, 0).getDay();
  }

  getTotalDaysInMonth(diff: number = 0) {
    return new Date(this._date.getFullYear(), this._date.getMonth() + 1 + diff, 0).getDate();
  }

  selectDate(date) {
    if (this._selectedDates.filter((d) => d.toDateString() === date.toDateString()).length) {
      // If date already selected remove it
      this._selectedDates = this._selectedDates.filter((d) => d.toDateString() !== date.toDateString());
    } else {
      // otherwise add it
      if (this.multiple) {
        this._selectedDates = [...this._selectedDates, date];
      } else {
        this._selectedDates = [date];
      }
    }

    this.onSelect.emit(this._selectedDates.map((d) => d.toDateString()).toString());
  }

  renderDayButton(date: Date) {
    const isToday = date.toDateString() === new Date().toDateString();
    const isSelected = this._selectedDates.filter((d) => d.toDateString() === date.toDateString()).length;

    const inMonthClass = date.getMonth() === this._date.getMonth() ? 'c-calendar__date--in-month' : '';
    const selectedClass = isSelected ? `c-button--${this.type}` : '';

    return (
      <button
        class={`c-calendar__date ${inMonthClass} hs-button ${selectedClass}`}
        aria-current={isToday && 'date'}
        aria-selected={isSelected.toString()}
        onClick={() => this.selectDate(date)}>
        {date.getDate()}
      </button>
    );
  }

  populateDaysPreviousMonth() {
    const days: Array<object> = [];
    const totalDaysInPreviousMonth = this.getTotalDaysInMonth(-1);
    for (let i = totalDaysInPreviousMonth; i > totalDaysInPreviousMonth - this.getFirstDay(); i--) {
      const date = new Date(this._date);
      date.setMonth(this._date.getMonth() - 1);
      date.setDate(i);
      const day = new Date(date);
      days.unshift(this.renderDayButton(day));
    }

    return days;
  }

  populateDaysCurrentMonth() {
    const days: Array<object> = [];
    const totalDaysInMonth: number = new Date(this._date.getFullYear(), this._date.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= totalDaysInMonth; i++) {
      const date = new Date(this._date);
      date.setDate(i);
      const day = new Date(date);
      days.push(this.renderDayButton(day));
    }

    return days;
  }

  populateDaysNextMonth() {
    const days: Array<object> = [];
    for (let i = 1; i < 7 - this.getLastDay(); i++) {
      const date = new Date(this._date);
      date.setDate(i);
      date.setMonth(this._date.getMonth() + 1);
      const day = new Date(date);
      days.push(this.renderDayButton(day));
    }

    return days;
  }

  navYear(diff) {
    const date = new Date(this._date);
    date.setFullYear(this._date.getFullYear() + diff);
    this._date = new Date(date);
  }

  navMonth(diff) {
    const date = new Date(this._date);
    date.setMonth(this._date.getMonth() + diff);
    this._date = new Date(date);
  }

  today() {
    this.selectDate(new Date());
    this._date = new Date();
  }

  render() {
    const typeClass = this.type ? `c-button--${this.type}` : '';

    return (
      <div class="hs-calendar">
        <button class="hs-calendar__control hs-calendar__control--prev-year" onClick={() => this.navYear(-1)}>
          &lsaquo;
        </button>
        <div class="hs-calendar__header hs-calendar__header--year">{this._date.getFullYear()}</div>
        <button class="hs-calendar__control hs-calendar__control--next-year" onClick={() => this.navYear(1)}>
          &rsaquo;
        </button>

        <button class="hs-calendar__control hs-calendar__control--prev-month" onClick={() => this.navMonth(-1)}>
          &lsaquo;
        </button>
        <div class="hs-calendar__header hs-calendar__header--month">{this.getMonthName()}</div>
        <button class="hs-calendar__control hs-calendar__control--next-month" onClick={() => this.navMonth(1)}>
          &rsaquo;
        </button>

        {this.days.map((day) => (
          <div class="hs--calendar__day">{day}</div>
        ))}

        {this.populateDaysPreviousMonth()}

        {this.populateDaysCurrentMonth()}

        {this.populateDaysNextMonth()}

        <div class="hs-calendar__footer">
          <button class={`c-calendar__today hs-button hs-button--block ${typeClass}`} onClick={() => this.today()}>
            Today
          </button>
        </div>
      </div>
    );
  }
}
