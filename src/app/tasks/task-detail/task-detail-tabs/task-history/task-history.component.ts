import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { TaskHistoryRequestModel } from 'src/app/Model/TasksHistoryModels';
import { GeneralService } from 'src/app/services/general.service';
import { ApiservicesService } from 'src/app/services/api.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.css']
})
export class TaskHistoryComponent implements OnInit {

  taskHistory = new TaskHistoryRequestModel();
  @Output() reloadData = new EventEmitter();
  @Input() mscv: string = ""
  editorConfig: AngularEditorConfig = {
    height: '150px',
    editable: true,
  }
  constructor(private generalService: GeneralService, private api: ApiservicesService) { }

  ngOnInit(): void {
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
