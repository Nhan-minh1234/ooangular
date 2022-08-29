import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
import data from './task-detail.language';
import * as moment from 'moment';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  spinnerLoading = false
  taskID

  constructor(private route: ActivatedRoute, private el: ElementRef, private api: ApiservicesService, public generalService: GeneralService, private router: Router) {
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.taskID = params['taskid']
      console.log(this.taskID)
      this.getTaskDetail();
    });
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`]
  }
  getTaskDetail() {
    this.api.httpCall(this.api.apiLists.getTaskDetail + this.taskID, {}, {}, 'get', true)
  }
}
