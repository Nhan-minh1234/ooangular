import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() eventList: Array<any>;
  @Output() getEvents = new EventEmitter<any>();
  d = new Date()
  dateActive = {
    year: this.d.getFullYear(),
    month: this.d.getMonth() + 1,
    date: this.d.getDate(),
  }
  today = this.d.toDateString()
  selected_date = this.d.toDateString();
  constructor() { }
  test = []
  daysInMonth = []
  ngOnInit(): void {
    this.getYears()
    this.getAllDateOfMonth()
  }
  selectedDay(date) {
    this.selected_date = date.fulldate
    this.getEvents.emit(date)
  }
  getEvent(fulldate) {
    for (let i of this.eventList) {
      if (i.fulldate === fulldate) {
        return i.items
      }
    }
    return [];
  }
  getAllDateOfMonth() {
    this.daysInMonth = []
    var date = new Date(this.dateActive.year, this.dateActive.month - 1, 1);
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 7; j++) {
        if (date.getDay() === j && date.getMonth() === this.dateActive.month - 1) {
          let item = {
            fulldate: date.toDateString(),
            items: this.getEvent(date.toDateString())
          }
          this.daysInMonth.push(item)
          date.setDate(date.getDate() + 1);
          if (item.fulldate === this.today) {
            this.selectedDay(item)
          }
        }
        else {
          this.daysInMonth.push({
            day: null,
            date: null,
            fulldate: null,
            items: []
          })
        }
      }
    }
  }
  getYears() {
    for (let i = 1970; i <= 2077; i++) {
      this.test.push(i);
    }
  }
  getMYSelected() {
    let wrap = document.querySelectorAll(".m-y-select-wrap")
    let a = document.querySelectorAll(".m-y-select-active")
    wrap.forEach((x, i) => {
      x.scrollTop = (a[i] as HTMLElement).offsetTop
    })
    //document.querySelectorAll(".m-y-select-active").forEach(x => x.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' }))
  }
  changeDate(month, year) {
    this.dateActive.month = month
    this.dateActive.year = year
    this.getAllDateOfMonth();
  }
}
