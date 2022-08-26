import { Component, OnInit } from '@angular/core';
import data from './search.language'
import { Router } from '@angular/router';;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']

}
)

export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.taoDuLieu()
  }
  editable = true;
  searchsData = []
  documentSandbox;
  currentTab = true;

  spinnerLoading = false;

  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  count = 500;

  config

  taoDuLieu(){
    for (let i = 0; i < this.count; i++) {
      let GiaTriMoi = {
      'numerical_order':i+1,
      'ttext_notation': 'Kí hiệu VB',
      'data_text': 'Ngày tháng VB',
      'text_type_name_and_excerpt': 'Tên loại VB và Trích yếu',
      'editing_place': 'Nơi soạn thảo',
      'date_of_arrival': 'Ngày đến ',
      'quantity':'Số lượng '
      }
      this.searchsData.push(GiaTriMoi)
    };
    this.config = {
      id: 'paging',
      itemsPerPage: this.pageSize,
      currentPage: this.page,
      totalItems: this.searchsData.length
    }
}
handlePageChange(event): void {
  this.page = event;
  this.taoDuLieu();
}
handlePageSizeChange(event): void {
  this.pageSize = event.target.value;
  this.page = 0;
  this.taoDuLieu();
}

}
