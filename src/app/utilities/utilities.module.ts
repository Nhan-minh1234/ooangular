import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DualListComponent } from './dual-list/dual-list.component';
import { NgChartsModule } from 'ng2-charts';
import { AvatarTooltipComponent } from './avatar-tooltip/avatar-tooltip.component';
import { NewItemButtonComponent } from './new-item-button/new-item-button.component';
import { FormsModule } from '@angular/forms';
import { ExpandButtonComponent } from './expand-button/expand-button.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DropzoneComponent } from './dropzone/dropzone.component';
import { GanttComponent } from './gantt/gantt.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DualListComponent,
    AvatarTooltipComponent,
    NewItemButtonComponent,
    ExpandButtonComponent,
    CalendarComponent,
    DropzoneComponent,
    GanttComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DualListComponent,
    AvatarTooltipComponent,
    NewItemButtonComponent,
    NgChartsModule,
    ExpandButtonComponent,
    CalendarComponent,
    DropzoneComponent,
    GanttComponent
  ]
})
export class UtilitiesModule { }
