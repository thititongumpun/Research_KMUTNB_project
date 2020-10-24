import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TotalcalComponent } from './pages/totalcal/totalcal.component';
import { CouponComponent } from './pages/coupon/coupon.component';
import { SaletranctionComponent } from './pages/saletranction/saletranction.component';

const routes: Routes = [
  {path: '', component: TotalcalComponent},
  {path: 'coupon', component: CouponComponent},
  {path: 'saletranction', component: SaletranctionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
