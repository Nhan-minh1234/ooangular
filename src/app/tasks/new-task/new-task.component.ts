import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { ApiservicesService } from 'src/app/services/api.service';
import { GeneralService } from 'src/app/services/general.service';
import * as moment from 'moment';
import { WizardComponent } from 'angular-archwizard';
import { Location, LocationChangeEvent } from '@angular/common';


@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  spinnerLoading = false
  htmlContent = '';
  project = ''
  projectList
  customer = ''
  customerList
  taskGroup = ''
  taskGroupList
  sampleTask = ''
  sampleTaskList
  taskName = ''
  startDate
  endDate
  unknownTimeCheck = false
  fileToUpload
  public myDatePickerOptions: IAngularMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
  };

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    minHeight: '80',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Nhập nội dung...',
  };

  step1BtnClicked = false
  step2BtnClicked = false
  step3BtnClicked = false

  constructor(private location: Location, private router: Router, private api: ApiservicesService, public generalService: GeneralService) { }
  wizardNavbtnClicked(step, direction) {
    if (step == 1) {
      this.step1BtnClicked = true
      if (this.step1Validator())
        this.wizardGoodToGo(direction)
    }
    else if (step == 2) {
      this.step2BtnClicked = true
      if (direction == 'next') {
        if (this.step2Validator())
          this.wizardGoodToGo(direction)
      }
      else
        this.wizardGoodToGo(direction)
    }
    else if (step == 3) {
      this.step3BtnClicked = true
    }
  }
  wizardGoodToGo(direction) {
    if (direction == 'next')
      this.wizard.goToNextStep();
    else if (direction == 'previous')
      this.wizard.goToPreviousStep();
  }


  /////////////////////// Step 1
  step1Validator() {
    if (this.taskName == '' || this.startDate == null || this.endDate == null || this.htmlContent == null) {
      this.generalService.showErrorToast(2, 'Các trường đánh dấu (*) không được bỏ trống');
      return false;
    }
    else if (!this.compareTwoDates()) {
      this.generalService.showErrorToast(2, 'Ngày kết thúc cần lớn hơn hoặc bằng ngày bắt đầu');
      return false;
    }
    else
      return true
  }
  onStartDateChanged(event: IMyDateModel) {
    console.log(event.singleDate)
  }
  onEndDateChanged(event: IMyDateModel) {
    console.log(event.singleDate)
  }
  ngOnInit(): void {
    this.onAsigneeGroupChange(null)
    this.onWatchableGroupChange(null)
  }
  ngOnDestroy(): void {
  }
  goBack() {
    this.location.back()
  }
  getProjectList() {

  }
  getCustomerList() {

  }
  getTaskGroupList() {

  }
  getSampleTaskist() {

  }
  compareTwoDates() {
    let start = moment(this.startDate.singleDate.formatted, 'DD-MM-YYYY')
    let end = moment(this.endDate.singleDate.formatted, 'DD-MM-YYYY')
    let diff = end.diff(start, 'days', false);
    if (diff < 0)
      return false
    else
      return true
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = Array.from(files);
    console.log(this.fileToUpload)
  }
  removeFileFromUploadList(index) {
    this.fileToUpload.splice(index, 1);
    const dt = new DataTransfer()
    const input = document.getElementById('fileList') as HTMLInputElement
    const { files } = input

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (index !== i)
        dt.items.add(file) // here you exclude the file. thus removing it.
    }

    input.files = dt.files
  }
  ////////////////////////Step 2

  allUserInStep2List
  chosenAssigneelList: any[] = [];
  groupKeyChosenInStep2 = 'all'
  majorAssignee
  dualListUpdateForAssignee(event) {
    this.allUserInStep2List = event.leftList; this.chosenAssigneelList = event.rightList
    // if(this.groupKeyChosenInStep2 == 'all')
    // {
    //   for(let i=0; i< this.allUserInStep2List.length; ++i)
    //   {
    //     if(!this.containsObject(this.allUserInStep2List[i],this.generalService.allUsers))
    //     this.allUserInStep2List.splice(i,1);
    //   }
    // }
    // else
    // {
    //   for(let i=0; i< this.allUserInStep2List.length; ++i)
    //   {
    //     if(!this.containsObject(this.allUserInStep2List[i],this.generalService.allUsersWithGroups[`${this.groupKeyChosenInStep2}`]))
    //     this.allUserInStep2List.splice(i,1);
    //   }
    // }

    //kiem tra xem majorAssignee đã chọn trước đó còn trong list chosen hay ko.
    if (this.majorAssignee != null) {
      let check = false;
      for (let i = 0; i < this.chosenAssigneelList.length; ++i) {
        if (this.majorAssignee == this.chosenAssigneelList[i]) { check = true; break; }
      }
      if (!check)
        this.majorAssignee = null
    }
  }
  step2Validator() {
    if (this.chosenAssigneelList.length == 0) {
      this.generalService.showErrorToast(2, 'Vui lòng chọn danh sách người tham gia xử lý');
      return false;
    }
    else if (this.majorAssignee == null) {
      this.generalService.showErrorToast(2, 'Vui lòng chọn người xử lý chính');
      return false;
    }
    else
      return true
  }

  onAsigneeGroupChange(e) {
    console.log(this.groupKeyChosenInStep2);
    if (e == null || this.groupKeyChosenInStep2 == 'all') {
      this.allUserInStep2List = this.generalService.cloneAnything(this.generalService.allUsers);
    }
    else {
      this.allUserInStep2List = this.generalService.allUsersWithGroups[`${this.groupKeyChosenInStep2}`]
    }
  }
  //////////////////////////Step 3

  allUserInStep3List
  chosenWatchablelList: any[] = [
  ];
  groupKeyChosenInStep3 = 'all'
  isUrgentTask = false;
  dualListUpdateForWatchable(event) {
    this.allUserInStep3List = event.leftList; this.chosenWatchablelList = event.rightList
    // if(this.groupKeyChosenInStep3 == 'all')
    // {
    //   for(let i=0; i< this.allUserInStep3List.length; ++i)
    //   {
    //     if(!this.containsObject(this.allUserInStep3List[i],this.generalService.allUsers))
    //     this.allUserInStep2List.splice(i,1);
    //   }
    // }
    // else
    // {
    //   for(let i=0; i< this.allUserInStep3List.length; ++i)
    //   {
    //     if(!this.containsObject(this.allUserInStep3List[i],this.generalService.allUsersWithGroups[`${this.groupKeyChosenInStep3}`]))
    //     this.allUserInStep3List.splice(i,1);
    //   }
    // }
  }
  step3Validator() {
    // if (this.chosenWatchablelList.length==0) {
    //   this.generalService.showErrorToast(2, 'Vui lòng chọn danh sách người tham gia xử lý');
    //   return false;
    // }
    // else if (this.majorAssignee==null) {
    //   this.generalService.showErrorToast(2, 'Vui lòng chọn người xử lý chính');
    //   return false;
    // }
    // else
    //   return true
  }

  onWatchableGroupChange(e) {
    console.log(this.groupKeyChosenInStep3);
    if (e == null || this.groupKeyChosenInStep3 == 'all') {
      this.allUserInStep3List = this.generalService.cloneAnything(this.generalService.allUsers);
    }
    else {
      this.allUserInStep3List = this.generalService.allUsersWithGroups[`${this.groupKeyChosenInStep3}`]
    }
  }

  async createNewTask() {
    this.spinnerLoading = true
    let body = {
      "chude": this.taskName,
      "msda": '',
      "noidung": this.htmlContent,
      "ngayBatDau": this.startDate.singleDate.date.month + '/' + this.startDate.singleDate.date.day + '/' + this.startDate.singleDate.date.year,
      "ngayHoanThanhDuKien": this.endDate.singleDate.date.month + '/' + this.endDate.singleDate.date.day + '/' + this.endDate.singleDate.date.year,
      "nguoiXuLyChinh": this.majorAssignee.userId,
      "laCongViecKhan": this.isUrgentTask,
      "nguoiTao": this.generalService.userData.userID,
      "participants": [
      ],
      "viewers": [
      ]
    }
    this.chosenAssigneelList.forEach(element => {
      if (element.userId != this.majorAssignee.userId)
        body.participants.push({
          "nguoiXuLy": element.userId
        })
    }
    );
    this.chosenWatchablelList.forEach(element =>
      body.viewers.push({
        "nguoiDuocXem": element.userId
      })
    );
    try {
      let result = await this.api.httpCall(this.api.apiLists.createNewTask, {}, body, 'post', true);
      this.spinnerLoading = false
      this.generalService.showErrorToast(1, 'Tạo công việc mới thành công.')
      this.location.back()
      debugger
      if (this.fileToUpload != null && this.fileToUpload.length > 0) {
        try {
          await this.api.postFile(this.fileToUpload, this.api.apiLists.uploadFile, {}, (result as any).mscv, false)
        } catch (error) {

        }
      }
    } catch (error) {
      this.spinnerLoading = false
    }
  }

  containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
        return true;
      }
    }

    return false;
  }
}



