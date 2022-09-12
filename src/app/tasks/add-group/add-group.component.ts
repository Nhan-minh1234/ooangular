import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WizardComponent } from 'angular-archwizard';
import { GeneralService } from 'src/app/services/general.service';
import data from './add-group.language';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  addGroupData = {
    location: '',
    description: '',

    invited: '',
    note: '',
    file: []
  }
  editable = true;
  eventDetail = {
    "date": "",
    "title": "",
    "description": "",
    "location": "",
    "time_start": "",
    "time_end": "",
    "status": null,
  }
  eventSandbox;
  currentTab = true;
  @ViewChild(WizardComponent)
  public wizard: WizardComponent;
  wizardStep = 0;
  spinnerLoading = false;
  eventListData
  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  count = 500;
newlist={
  number:1,
  name:'',
  status: 'Chưa hoàn thành'
}
  config
  constructor(private httpClient: HttpClient, public generalService: GeneralService, private router: Router, private _location: Location) { }

  ngOnInit(): void {
    this.gData();
  }
  seeDetail(obj) {
    this.editable = true;
    this.eventDetail = { ...obj }
  }
  editEvent() {
    this.editable = false;
    this.eventSandbox = { ...this.eventDetail }
  }
  cancelEditEvent() {
    this.editable = true;
    this.eventDetail = { ...this.eventSandbox }
  }
  changeTabs(tab) {
    this.currentTab = tab;
    this.page = 0;
    this.count = 0;
    this.pageSize = 10;
    this.gData();
  }
  async gData() {
    this.spinnerLoading = true;
    this.httpClient.get('https://62fde3c541165d66bfb3a622.mockapi.io/api/project?sortby=number').subscribe(i => {
      this.eventListData = i;
      this.config = {
        id: 'paging',
        itemsPerPage: this.pageSize,
        currentPage: this.page,
        totalItems: this.eventListData.length
      }
      this.spinnerLoading = false;
    })
  }
  handlePageChange(event): void {
    this.page = event;
    this.gData();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 0;
    this.gData();
  }
  handleFileInput(files: FileList) {
    this.addGroupData.file = Array.from(files);
    console.log(files)
  }
  goBack() {
    this._location.back();
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`]
  }
  number() {
    let numbers = []
    for (let i = 1; i <= 100; i++) {
      numbers.push(i)
    }

    return numbers

  }
  clicknew(){
    this.httpClient.post('https://62fde3c541165d66bfb3a622.mockapi.io/api/project',this.newlist).subscribe(i=>
    {
      this.generalService.showErrorToast(1, 'Đã thêm mới')
     this.newlist={
        number:1,
        name:'',
        status: 'chua hoan thanh'
      }
      this.gData()
    }
    
    )
  }


}
