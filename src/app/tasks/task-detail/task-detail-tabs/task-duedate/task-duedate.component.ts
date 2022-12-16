import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-duedate',
  templateUrl: './task-duedate.component.html',
  styleUrls: ['./task-duedate.component.css']
})
export class TaskDuedateComponent implements OnInit {

  @Input() batdau: string = ""
  @Input() hoanthanh: string = ""
  constructor() { }
  ngOnInit(): void {
  }

}
