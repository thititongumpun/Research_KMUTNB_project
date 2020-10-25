import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TotalcalComponent } from './pages/totalcal/totalcal.component';

const routes: Routes = [
  {path: '', component: TotalcalComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
