import { Component, ElementRef, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { HttpClient } from '@angular/common/http';
import data from './event-sample.language'
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-sample',
  templateUrl: './event-sample.component.html',
  styleUrls: ['./event-sample.component.css']
})
export class EventSampleComponent implements OnInit {
  eventSampleData
  spinnerLoading = false;
  editable = true
  page = 0;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  count = 500;
  currentTab = true
  

  config
  constructor(private httpClient: HttpClient, private el: ElementRef, public generalService: GeneralService, private router: Router) { }

  ngOnInit(): void {
    this.gData();

  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`]
  }

  seeDetail(obj) {
    this.editable = true;
  }
  editEvent() {
    this.editable = false;

  }
  cancelEditEvent() {
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
    this.httpClient.get('https://6316eb5bcb0d40bc4146ca46.mockapi.io/sample-event').subscribe(i => {
      this.eventSampleData = i;
      console.log(i)
      this.config = {
        id: 'paging',
        itemsPerPage: this.pageSize,
        currentPage: this.page,
        totalItems: this.eventSampleData.length
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


