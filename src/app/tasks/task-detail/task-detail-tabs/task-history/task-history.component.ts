import { Component, OnInit, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { TaskHistoryRequestModel, TaskHistoryResponseModel } from 'src/app/Model/TasksHistoryModels';
import { GeneralService } from 'src/app/services/general.service';
import { ApiservicesService } from 'src/app/services/api.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as moment from 'moment';
@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.css']
})
export class TaskHistoryComponent implements OnInit {

  taskHistory = new TaskHistoryRequestModel();
  @Output() reloadData = new EventEmitter();
  @Input() dsNhatKy: Array<TaskHistoryResponseModel>
  @Input() mscv: string = ""
  editorConfig: AngularEditorConfig = {
    height: '150px',
    editable: true,
  }
  page = 0;
  pageSize = 10;
  config = {
    id: "paging",
    itemsPerPage: this.pageSize,
    currentPage: this.page,
    totalItems: 0
  }
  constructor(private generalService: GeneralService, private api: ApiservicesService) { }

  ngOnInit(): void {
    moment.locale('vi')
  }
  ngOnChanges(changes: SimpleChanges) {
    this.config = {
      id: "paging",
      itemsPerPage: this.pageSize,
      currentPage: this.page,
      totalItems: this.dsNhatKy.length
    }
  }
  handlePageChange(event): void {
    this.page = event;
    this.config = {
      id: "paging",
      itemsPerPage: this.pageSize,
      currentPage: this.page,
      totalItems: this.dsNhatKy.length
    }
  }
  timeToCalendar(time: string) {
    var numb = moment(moment()).diff(time, 'hours')
    if (numb > 2) {
      return moment(time).format("LLL");
    }
    return moment(time).fromNow();
  }
  async addAComment() {
    if (this.taskHistory.noiDung !== "" && this.taskHistory.noiDung !== undefined) {
      this.taskHistory.mscv = this.mscv;
      var res = await this.api.httpCall(this.api.apiLists.AddNewTaskHistory, {}, this.taskHistory, 'post', true);
      var result = <any>res;
      this.reloadData.emit();
      result.validationMessages.forEach(x => {
        this.generalService.showErrorToast(result.IsValid ? 0 : 1, x)
      });
    }
  }
}
