import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AugmentPageRoutingModule } from './augment-routing.module';

import { AugmentPage } from './augment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AugmentPageRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [AugmentPage]
})
export class AugmentPageModule {}
