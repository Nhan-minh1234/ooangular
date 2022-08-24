import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from 'src/app/services/general.service';
import data from './project.language';
import { Console } from 'console';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  editable = true;
  deleteList = []

  eventSandbox;
  currentTab = true;
  eventDetail = {
    "date": "",
    "title": "",
    "description": "",
    "location": "",
    "time_start": "",
    "time_end": "",
    "status": null,
  }


  spinnerLoading = false;
  eventListData
  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  count = 500;

  config
  constructor(private httpClient: HttpClient, public generalService: GeneralService, private router: Router) { }

  ngOnInit(): void {
    this.gData();
  }
  seeDetail(obj) {
    this.editable = true;
    this.eventDetail = { ...obj }
  }
  editProject() {
    this.editable = false;

  }
  cancelEditProject() {
    this.editable = true;

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
    this.httpClient.get('https://62fde3c541165d66bfb3a622.mockapi.io/api/projectlist').subscribe(i => {
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
  addlist(id, x) {
    if (x.target.checked) {
      this.deleteList.push(id)
    } else {
      this.deleteList = this.deleteList.filter((e) => {
        e !== id
      })
    }
  }
  test() {
    this.deleteList.forEach((e)=>{
      this.httpClient.delete(`https://62fde3c541165d66bfb3a622.mockapi.io/api/projectlist/${e}`).subscribe((a)=>{
        this.generalService.showErrorToast(2, 'da xoa')
      this.gData() 
    }
      )
    })
  }
  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 0;
    this.gData();
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`]
  }

}
