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

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DualListComponent,
    AvatarTooltipComponent,
    NewItemButtonComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DualListComponent,
    AvatarTooltipComponent,
    NewItemButtonComponent,
    NgChartsModule
  ]
})
export class UtilitiesModule { }
