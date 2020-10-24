import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TemplateComponent } from './template/template.component';
import { TotalcalComponent } from './pages/totalcal/totalcal.component';
import { CouponComponent } from './pages/coupon/coupon.component';
import { SaletranctionComponent } from './pages/saletranction/saletranction.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    TotalcalComponent,
    CouponComponent,
    SaletranctionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
