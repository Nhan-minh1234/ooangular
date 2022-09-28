import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css']
})
export class GanttComponent implements OnInit {
  data = [{
    startAt: '2022-10-09',
    endAt: '2022-10-13',
    taskTitle: 'Task 1',
  },
  {
    startAt: '2022-10-14',
    endAt: '2022-10-20',
    taskTitle: 'Task 2',
  },
  {
    startAt: '2022-10-21',
    endAt: '2022-12-01',
    taskTitle: 'Task 3',
  }]
  ganttData = []
  minDate
  constructor() { }

  ngOnInit(): void {
    this.getDays(this.data)
    let b = {}
    this.ganttData.forEach(x => {
      let a = x.getFullYear() + '-' + x.getMonth()
      b[a] = (b[a] || 0) + 1
    })
  }
  getDays(data) {
    let startAt = [...data.map(a => { return new Date(a.startAt) })]
    let endAt = [...data.map(a => { return new Date(a.endAt) })]
    let minDate = new Date(Math.min.apply(null, startAt))
    let maxDate = new Date(Math.max.apply(null, endAt))
    this.minDate = minDate.toISOString().slice(0, 10)
    let count = this.getDifferenceInDays(minDate, maxDate)
    for (let i = 0; i <= count; i++) {
      let date = new Date(minDate.setDate(minDate.getDate() + 1))
      this.ganttData.push(date)
    }
  }
  getDifferenceInDays(min, max) {
    let minDate = new Date(min)
    let maxDate = new Date(max)
    let Difference_In_Time = maxDate.getTime() - minDate.getTime();
    return Difference_In_Time / (1000 * 3600 * 24);
  }
}
