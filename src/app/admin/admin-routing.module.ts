import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './users/users.component';
import { TheGroupUserComponent } from './the-group-user/the-group-user.component';
import { NewGroupUserComponent } from './new-group-user/new-group-user.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    data: { "link": "/admin" },
    children: [
      {
        data: { "link": "/admin/users" },
        path: 'users',
        component: UsersComponent
      },
      {
        data: { "link": "/admin/the-group-user" },
        path: 'the-group-user',
        component:TheGroupUserComponent
      },
      {
        data: { "link": "/admin/new-group-user" },
        path: 'new-group-user',
        component:NewGroupUserComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
