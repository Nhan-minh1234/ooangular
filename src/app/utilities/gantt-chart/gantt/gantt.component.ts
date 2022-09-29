import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css']
})
export class GanttComponent implements OnInit {
  data = [{
    startAt: '2022-10-11',
    endAt: '2022-10-23',
    taskTitle: 'Task 1',
  },
  {
    startAt: '2022-10-09',
    endAt: '2022-12-10',
    taskTitle: 'Task 2',
  },
  {
    startAt: '2022-10-12',
    endAt: '2022-10-22',
    taskTitle: 'Task 3',
  },
  {
    startAt: '2022-11-03',
    endAt: '2022-11-20',
    taskTitle: 'Task 3',
  },
  {
    startAt: '2022-11-23',
    endAt: '2022-12-02',
    taskTitle: 'Task 3',
  }]
  ganttData = []
  minDate
  dateMonthData = {
    totalDay: 0,
    minDate: '',
    maxDate: '',
  }
  totalCol = 0
  constructor() { }

  ngOnInit(): void {
    this.getDays(this.data)

  }
  getDays(data) {
    let startAt = [...data.map(a => { return new Date(a.startAt) })]
    let endAt = [...data.map(a => { return new Date(a.endAt) })]
    let minDate = new Date(Math.min.apply(null, startAt))
    let maxDate = new Date(Math.max.apply(null, endAt))
    minDate.setDate(1)
    this.minDate = moment(minDate).format("YYYY-MM-DD")
    let monthDiff = maxDate.getUTCMonth() - minDate.getUTCMonth()
    var a = moment(minDate)
    var b = moment(maxDate)
    for (let i = 0; i <= monthDiff; i++) {
      let month = minDate.getUTCMonth() + 1
      let year = minDate.getFullYear()
      let obj = {
        month: year + '-' + month,
        list: []
      }
      while (minDate.getUTCMonth() + 1 === month) {
        obj.list.push(moment(minDate).format('YYYY-MM-DD'))
        minDate.setDate(minDate.getDate() + 1)
      }
      this.ganttData.push(obj)
      this.totalCol = this.totalCol + this.ganttData[i].list.length
    }
    this.scrollToCurrentTask()
  }
  scrollToCurrentTask() {
    document.querySelector('a[data-bs-toggle="tab"][href="#targets"]').addEventListener('shown.bs.tab', function () {
      let bar = document.querySelector("#bar-node")
      let gantt = document.querySelector(".gantt")
      gantt.scrollLeft = (bar as HTMLElement).offsetLeft / 2
    })
  }
  getDifferenceInDays(min, max) {
    let minDate = new Date(min)
    let maxDate = new Date(max)
    let Difference_In_Time = maxDate.getTime() - minDate.getTime();
    return Difference_In_Time / (1000 * 3600 * 24);
  }
}
