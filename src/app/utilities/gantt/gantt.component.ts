import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css']
})
export class GanttComponent implements OnInit {
  @ViewChild('gantt') ganttEl: ElementRef;
  constructor() { }
  myGantt
  ngOnInit(): void {
  }
}
