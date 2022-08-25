import { Component, OnInit } from '@angular/core';
import { ChartData, ChartConfiguration, ChartType, ChartOptions } from 'chart.js';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: ['./task-overview.component.css', '../../task-detail.component.css']
})
export class TaskOverviewComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    height: '200px',
    editable: true,
  }
  public chartLabels: string[] = ['Còn hạn', 'Gần hạn', 'Quá hạn', 'Đề xuất kết thúc'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.chartLabels,
    datasets: [
      { data: [350, 450, 100, 100] },
    ]
  };
  public ChartConfig: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.4
      }
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: { display: true },
    }
  }
  public chartOption: ChartOptions = {
    color: 'red',
  }
  public doughnutChartType: ChartType = 'doughnut';
  constructor() { }

  ngOnInit(): void {
  }

}
