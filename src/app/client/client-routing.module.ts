import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import {ContractComponent} from './contract/contract.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ReportComponent } from './report/report.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  {
    path: '',
    data: { 'link': '/client' },
    component: ClientComponent,
    children: [
      {
        data: { "link": "/client/contract" },
        path: 'contract',
        component: ContractComponent
      },
      {
        data: { "link": "/client/catalog" },
        path: 'catalog',
        component: CatalogComponent
      },
      {
        data: { "link": "/client/report" },
        path: 'report',
        component: ReportComponent
      },
      {
        data: { "link": "/client/search" },
        path: 'search',
        component: SearchComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
