import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalRoutingModule } from './personal-routing.module';
<<<<<<< Updated upstream
import { EventComponent } from './event/event.component';
import { FileCabinetComponent } from './file-cabinet/file-cabinet.component';
import { BusinessCardComponent } from './business-card/business-card.component';
import { ArchwizardModule } from 'angular-archwizard';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxLoadingModule } from 'ngx-loading';
import { UtilitiesModule } from '../utilities/utilities.module';
import { FormsModule } from '@angular/forms';
import { NewEventComponent } from './new-event/new-event.component';
import { CircleProgressOptions, NgCircleProgressModule } from 'ng-circle-progress';
import { NewFileCabinetComponent } from './new-file-cabinet/new-file-cabinet.component';
import { AddBusinessCardComponent } from './add-business-card/add-business-card.component';

@NgModule({
  declarations: [
    EventComponent,
    FileCabinetComponent,
    BusinessCardComponent,
    NewEventComponent,
    NewFileCabinetComponent,
    AddBusinessCardComponent
=======

import { FileCabinetComponent } from './file-cabinet/file-cabinet.component';
import { BusinessCardComponent } from './business-card/business-card.component';
import { PersonalComponent } from './personal.component';
import { ArchwizardModule } from 'angular-archwizard';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { UtilitiesModule } from '../utilities/utilities.module';
import { FormsModule } from '@angular/forms';
import { CalanderComponent } from './calander/calander.component';


@NgModule({
  declarations: [
    CalanderComponent,
    FileCabinetComponent,
    BusinessCardComponent,
    CalanderComponent
>>>>>>> Stashed changes
  ],
  imports: [
    CommonModule,
    PersonalRoutingModule,
    ArchwizardModule,
<<<<<<< Updated upstream
    NgxPaginationModule,
    NgxLoadingModule,
    UtilitiesModule,
    FormsModule,
    NgCircleProgressModule
  ],
  providers:[
    CircleProgressOptions
=======
    NgxLoadingModule,
    NgxPaginationModule,
    UtilitiesModule,
    FormsModule
>>>>>>> Stashed changes
  ]
})
export class PersonalModule { }
