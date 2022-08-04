import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventComponent } from './event/event.component';
import { NewEventComponent } from './new-event/new-event.component';

const routes: Routes = [
  {
    path: '',
    data: { 'link': '/event' },
    component: EventComponent,
    children: [
      {
        data: { "link": "/event/event-list" },
        path: 'event-list',
        component: EventListComponent
      },
      {
        data: { "link": "/event/new-event" },
        path: 'new-event',
        component: NewEventComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
