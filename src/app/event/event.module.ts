import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event/event.component';
import { EventListComponent } from './event-list/event-list.component';
import { CalendarComponent } from '../utilities/calendar/calendar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxLoadingModule } from 'ngx-loading';
import { NewEventComponent } from './new-event/new-event.component';
import { ArchwizardModule } from 'angular-archwizard';
import { UtilitiesModule } from '../utilities/utilities.module';
import { FormsModule } from '@angular/forms';
import { EventSampleComponent } from './event-sample/event-sample.component';
import { LocationComponent } from './location/location.component';
import { NewEventSampleComponent } from './new-event-sample/new-event-sample.component';


@NgModule({
  declarations: [
    EventComponent,
    EventListComponent,
    CalendarComponent,
    NewEventComponent,
    LocationComponent,
    EventSampleComponent,
    NewEventSampleComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    ArchwizardModule,
    NgxPaginationModule,
    NgxLoadingModule,
    UtilitiesModule,
    FormsModule
  ]
})
export class EventModule { }
