import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
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

  spinnerLoading = false;
  eventListData
  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  count = 500;

  config
  constructor(private httpClient: HttpClient,  public generalService: GeneralService, private router: Router) { }

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
  openNewEvent() {
    this.router.navigate(['/personal/new-event']);
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
 

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 0;
    this.gData();
  }

}
