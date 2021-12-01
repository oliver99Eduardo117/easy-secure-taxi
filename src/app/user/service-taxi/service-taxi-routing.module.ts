import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceTaxiPage } from './service-taxi.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceTaxiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceTaxiPageRoutingModule {}
