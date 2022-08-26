import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewTaskComponent } from "./new-task/new-task.component";
import { TaskDetailComponent } from "./task-detail/task-detail.component";
import { TaskListComponent } from "./task-list/task-list.component";
import { TasksComponent } from "./tasks/tasks.component";
import { TaskReportComponent } from "./task-report/task-report.component";
import { TaskAutocompleteComponent } from "./task-autocomplete/task-autocomplete.component";
import { ProjectComponent } from "./project/project.component";
import { ProjectListComponent } from "./project-list/project-list.component";
import { ProjectGroupComponent } from "./project-group/project-group.component";
import { AddGroupComponent } from "./add-group/add-group.component";
import { PassGroupComponent } from "./pass-group/pass-group.component";

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    data: { "link": "/tasks" },
    children: [
      {
        data: { "link": "/tasks/new-task" },
        path: 'new-task',
        component: NewTaskComponent
      },
      {
        data: { "link": "/tasks/task-list" },
        path: 'task-list',
        component: TaskListComponent
      },
      {
        data: { "link": "/tasks/project" },
        path: 'project',
        component: ProjectComponent
      },
      {
        data: { "link": "/tasks/task-detail" },
        path: 'task-detail/:taskid',
        component: TaskDetailComponent
      },
      {
        data: { "link": "/tasks/project-list" },
        path: 'project-list',
        component: ProjectListComponent
      },
      {
        data: { "link": "/tasks/task-report" },
        path: 'task-report',
        component: TaskReportComponent
      },
      {
        data: { "link": "/tasks/task-autocomplete" },
        path: 'task-autocomplete',
        component: TaskAutocompleteComponent
      }, {
        data: { "link": "/tasks/project-group" },
        path: 'project-group',
        component: ProjectGroupComponent
      },
      {
        data: { "link": "/tasks/add-group" },
        path: 'add-group',
        component: AddGroupComponent
      },
      {
        data: { "link": "/tasks/pass-group" },
        path: 'pass-group',
        component: PassGroupComponent
      },
      
      // {
      //   data: { "link": "/user/change-password" },
      //   path:'change-password',
      //   component:ChangePasswordComponent
      // },
      // {
      //   data: { "link": "/user/help" },
      //   path:'help',
      //   component:HelpComponent
      // }
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TasksRouting { }