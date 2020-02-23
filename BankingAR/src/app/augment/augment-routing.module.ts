import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AugmentPage } from './augment.page';

const routes: Routes = [
  {
    path: '',
    component: AugmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AugmentPageRoutingModule {}
