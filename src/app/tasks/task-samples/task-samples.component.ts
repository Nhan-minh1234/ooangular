import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-samples',
  templateUrl: './task-samples.component.html',
  styleUrls: ['./task-samples.component.css']
})
export class TaskSamplesComponent implements OnInit {
  taskSampleData = []
  spinnerLoading = false
  page = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];
  count = 500;
  config
  constructor() { }

  ngOnInit(): void {
    this.gData();
  }
  gData() {
    this.taskSampleData = []
    for (let i = 0; i <= this.count; i++) {
      let randomDate = () => {
        let start = new Date(2012, 0, 1);
        let end = new Date();
        let date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return date;
      }
      let randomText = () => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 20; i++) {
          result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
        }
        return result;
      }
      let d = {
        number: i,
        title: randomText(),
        isLoop: randomText()
      }
      this.taskSampleData.push(d);
    }
    this.config = {
      id: 'paging',
      itemsPerPage: this.pageSize,
      currentPage: this.page,
      totalItems: this.taskSampleData.length
    }
  }
}
