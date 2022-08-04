import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventComponent } from './event/event.component';
import { NewEventComponent } from './new-event/new-event.component';
import { EventSampleComponent } from './event-sample/event-sample.component';
import { LocationComponent } from './location/location.component';

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
      {
        data: { "link": "/event/event-sample" },
        path: 'event-sample',
        component: EventSampleComponent
      }, {
        data: { "link": "/event/location" },
        path: 'location',
        component: LocationComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
