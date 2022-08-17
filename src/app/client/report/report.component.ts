import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { HttpClient } from '@angular/common/http';
import data from 'src/app/tasks/task-list/task-list.language';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  editable = true;
  deletetable = true;
  

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
