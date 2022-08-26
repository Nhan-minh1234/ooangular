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
  eventSampleData = []
  spinnerLoading = false;
  eventListData
  editable = true
  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  count = 500;
  currentTab = true

  config
  constructor(private httpClient: HttpClient, private el: ElementRef, public generalService: GeneralService, private router: Router) { }

  ngOnInit(): void {
    this.data()
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`]
  }
  data() {
    for (let i = 0; i < 10; i++){
      let d = {
        name: `Lê thị chung ${i}`,
        date: '01/01/2022',
        time: '14h00',
        description: 'none',
        location: 'Hà Nội'
      }
      this.eventSampleData.push(d);
    };
  }
  seeDetail(obj){
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
    this.data();
  }

}
