import { Component, OnInit } from '@angular/core';
import { ChartData, ChartConfiguration, ChartType, ChartOptions } from 'chart.js';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: ['./task-overview.component.css', '../../task-detail.component.css']
})
export class TaskOverviewComponent implements OnInit {
  activityTypes = [
    { typeid: 'type1', typename: 'Type 1', typeColor: 'success', status: true },
    { typeid: 'type2', typename: 'Type 2', typeColor: 'danger', status: true },
    { typeid: 'type3', typename: 'Type 3', typeColor: 'primary', status: true },
    { typeid: 'type4', typename: 'Type 4', typeColor: 'warning', status: true },
  ]
  dateSelectedEvents
  getEvents(a) {
    this.dateSelectedEvents = a
  }
  editorConfig: AngularEditorConfig = {
    height: '150px',
    editable: true,
  }
  events = [{
    fulldate: 'Wed Sep 07 2022',
    items: [
      {
        title: 'Branding Logo',
        id: 'idk',
        author: 'Nguyen Hoai Thuong'
      },
      {
        title: 'Design main Dashboard',
        id: 'idk',
        author: 'Nguyen Hoai Thuong'
      },
    ]
  },
  {
    fulldate: 'Mon Sep 19 2022',
    items: [
      {
        title: 'User Module Testing',
        id: 'idk',
        author: 'Nguyen Hoai Thuong'
      },
    ]
  },
  {
    fulldate: 'Thu Sep 22 2022',
    items: [
      {
        title: 'To check User Management',
        id: 'idk',
        author: 'Nguyen Hoai Thuong'
      }, {
        title: 'To check User Management 1',
        id: 'idk',
        author: 'Nguyen Hoai Thuong'
      }, {
        title: 'To check User Management 2',
        id: 'idk',
        author: 'Nguyen Hoai Thuong'
      },
    ]
  }
  ]
  nextEvent = []
  public chartLabels: string[] = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  public doughnutChartData: ChartConfiguration['data'] = {
    labels: this.chartLabels,
    datasets: [
      { data: [5, 9, 8, 1, 6, 5, 11], label: 'Quá hạn' },
      { data: [12, 19, 10, 11, 16, 5, 10], label: 'Kết thúc' },
    ]
  };
  public ChartConfig: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0
      }
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {}
    },
    plugins: {
      legend: { display: true },
    }
  }
  public chartOption: ChartOptions = {
    color: 'red',
  }
  public chartType: ChartType = 'line';
  constructor() { }

  ngOnInit(): void {
    this.nextEvent = this.events.filter(x =>
      new Date(x.fulldate).getTime() >= new Date(new Date().toDateString()).getTime()
    )
  }

}
