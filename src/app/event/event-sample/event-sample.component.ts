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
  eventListData
  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  count = 500;

  config
  constructor(private httpClient: HttpClient, private el: ElementRef, public generalService: GeneralService, private router: Router) { }

  ngOnInit(): void {
  }
  getLabel(key) {
    return data[`${this.generalService.currentLanguage.Code}`][`${key}`]
  }
}
