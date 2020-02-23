import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AugmentCreditPage } from './augment-credit.page';

const routes: Routes = [
  {
    path: '',
    component: AugmentCreditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AugmentCreditPageRoutingModule {}
