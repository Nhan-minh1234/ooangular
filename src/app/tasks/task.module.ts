import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { TasksRouting } from './task-routing.module';
import { TaskListComponent } from './task-list/task-list.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { TasksComponent } from './tasks/tasks.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ArchwizardModule } from 'angular-archwizard';
import { UtilitiesModule } from '../utilities/utilities.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxLoadingModule } from "ngx-loading";
import { CircleProgressOptions, NgCircleProgressModule } from 'ng-circle-progress';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskReportComponent } from './task-report/task-report.component';
import { TaskAutocompleteComponent } from './task-autocomplete/task-autocomplete.component';
import { DonutChartComponent } from '../utilities/donut-chart/donut-chart.component';
import { ReportComponent } from './report/report.component';
import { ProjectComponent } from './project/project.component';
import { PeriodicalReportComponent } from './periodical-report/periodical-report.component';
@NgModule({
  declarations: [
    TaskListComponent,
    NewTaskComponent,
    TasksComponent,
    TaskDetailComponent,
    TaskReportComponent,
    TaskAutocompleteComponent,
    DonutChartComponent,
    ReportComponent,
    ProjectComponent,
    PeriodicalReportComponent
  ],
  imports: [
    CommonModule,
    TasksRouting,
    FormsModule,
    AngularMyDatePickerModule,
    AngularEditorModule,
    ArchwizardModule,
    UtilitiesModule,
    NgxPaginationModule,
    NgxLoadingModule.forRoot({}),
    NgCircleProgressModule,
  ],
  providers: [
    CircleProgressOptions
  ]
})
export class TasksModule { }
