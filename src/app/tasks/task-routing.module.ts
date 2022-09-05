import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewTaskComponent } from "./new-task/new-task.component";
import { TaskDetailComponent } from "./task-detail/task-detail.component";
import { TaskListComponent } from "./task-list/task-list.component";
import { TasksComponent } from "./tasks/tasks.component";
import { TaskReportComponent } from "./task-report/task-report.component";
import { TaskSamplesComponent } from "./task-samples/task-samples.component";
import { TopicComponent } from "./topic/topic.component";
import { TopicDetailComponent } from "./topic-detail/topic-detail.component";

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
        data: { "link": "/tasks/task-detail" },
        path: 'task-detail/:taskid',
        component: TaskDetailComponent
      },
      {
        data: { "link": "/tasks/task-report" },
        path: 'task-report',
        component: TaskReportComponent
      },
      {
        data: { "link": "/tasks/task-samples" },
        path: 'task-samples',
        component: TaskSamplesComponent
      },
      {
        data: { "link": "/tasks/topic" },
        path: 'topic',
        component: TopicComponent
      },
      {
        data: { "link": "/tasks/topic-detail" },
        path: 'topic-detail',
        component: TopicDetailComponent
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