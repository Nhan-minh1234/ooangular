import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gantt-row',
  templateUrl: './gantt-row.component.html',
  styleUrls: ['./gantt-row.component.css']
})
export class GanttRowComponent implements OnInit {

  //@Input() row: number = 1
  @Input() col_start: number = 3
  @Input() col_end: number = 10
  //@Input() col: number = 32
  //@Input() task_title: string = "Công Việc"
  @Input() isNode: boolean = false
  constructor() { }

  ngOnInit(): void {
  }

}
