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

@NgModule({
  declarations: [
    TaskListComponent,
    NewTaskComponent,
    TasksComponent,
    TaskDetailComponent,

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
  providers:[
    CircleProgressOptions
  ]
})
export class TasksModule { }
