import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceTaxiPageRoutingModule } from './service-taxi-routing.module';

import { ServiceTaxiPage } from './service-taxi.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceTaxiPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ServiceTaxiPage]
})
export class ServiceTaxiPageModule {}
