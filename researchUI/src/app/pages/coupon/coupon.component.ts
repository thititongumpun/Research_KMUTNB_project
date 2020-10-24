import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiServiceService } from 'app/services/api-service.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {

  @ViewChild('Monitor', { static: false }) Monitor: ModalDirective;


  constructor(private apiServiceService: ApiServiceService) { }

  disabledAll: boolean;

  response: any;

  items = [
    { code: 'COUPON', name: 'Encrypted for Coupon', status: null, date: null, time: null, response: null, disabled: false },
    { code: 'CHECKCOUPON', name: 'Get & Check Coupon (gateway)', status: null, date: null, time: null, response: null, disabled: false },
    { code: 'ISSUECOUPON', name: 'Issue Coupon (gateway)	', status: null, date: null, time: null, response: null, disabled: false },
    { code: 'ENCRYPTEDCOUPON', name: 'Encrypt Cashier Coupon', status: null, date: null, time: null, response: null, disabled: false },
    { code: 'CHECKCASHIER',  name: 'Check cashier coupon (gateway)', status: null, date: null, time: null, response: null, disabled: false }

  ];

  ngOnInit(): void {
  }

  Refresh(): void {
    this.Clear('COUPON');
    this.Clear('CHECKCOUPON');
    this.Clear('ISSUECOUPON');
    this.Clear('ENCRYPTEDCOUPON');
    this.Clear('CHECKCASHIER');
  }

  DateTime(): string {
    return new Date().getDate()  + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear() + ' ' + new Date().getHours() + ':'
        + (new Date().getMinutes() < 10 ? '0' : '' ) + new Date().getMinutes() + ':' + new Date().getSeconds();
  }

  Clear(type): void {
    this.items.forEach(element => {
      if (element.code === type) {
        element.status = null;
        element.date = null;
        element.time = null;
        element.response = null;
        element.disabled = false;
      }
    });
  }

  Error(type, startTime, error): void {
    this.items.forEach(element => {
      if (element.code === type) {
        element.status   = false;
        element.disabled = false;
        element.date     = this.DateTime();
        element.time     = (new Date().getTime() - startTime) / 1000;
        element.response = error.statusText;
      }
    });
  }

  ShowResponseMonitor(type): void {
    switch (type) {
      case 'COUPON':
        this.response = this.items.filter(element => element.code === 'COUPON')[0].response;
        break;
      case 'CHECKCOUPON':
        this.response = this.items.filter(element => element.code === 'CHECKCOUPON')[0].response;
        break;
      case 'ISSUECOUPON':
        this.response = this.items.filter(element => element.code === 'ISSUECOUPON')[0].response;
        break;
      case 'ENCRYPTEDCOUPON':
        this.response = this.items.filter(element => element.code === 'ENCRYPTEDCOUPON')[0].response;
        break;
      case 'CHECKCASHIER':
        this.response = this.items.filter(element => element.code === 'CHECKCASHIER')[0].response;
        break;

    }
    this.Monitor.show();
  }

  CloseResponseMonitor(): void {
    this.Monitor.hide();
  }

  SetAction(type, startTime, response): void {
    this.items.forEach(element => {
      if (element.code === type) {
        element.status = (response.message.toLowerCase() === 'success') ? true : false;
        if (element.status) {
          element.date = element.status ? this.DateTime() : null;
          element.time = (new Date().getTime() - startTime) / 1000;
        }
        element.disabled = false;
        element.response = response;
      }
    });
  }

  Action(type): void {
    const startTime = new Date();
    switch (type) {
      case 'COUPON':
        this.Clear('COUPON');
        this.items.forEach(element => element.disabled = (element.code === type) ? true : false);
        this.apiServiceService.Get('GetCoupon').subscribe(response => this.SetAction('COUPON', startTime, response),
          error => this.Error('COUPON', startTime, error));
        break;
      case 'CHECKCOUPON':
        this.Clear('CHECKCOUPON');
        this.items.forEach(element => element.disabled = (element.code === type) ? true : false);
        this.apiServiceService.Get('GetCheckCoupon').subscribe(response => this.SetAction('CHECKCOUPON', startTime, response),
          error => this.Error('CHECKCOUPON', startTime, error));
        break;
      case 'ISSUECOUPON':
        this.Clear('ISSUECOUPON');
        this.items.forEach(element => element.disabled = (element.code === type) ? true : false);
        this.apiServiceService.Get('GetIssueCoupon').subscribe(response => this.SetAction('ISSUECOUPON', startTime, response),
          error => this.Error('ISSUECOUPON', startTime, error));
        break;
      case 'ENCRYPTEDCOUPON':
        this.Clear('ENCRYPTEDCOUPON');
        this.items.forEach(element => element.disabled = (element.code === type) ? true : false);
        this.apiServiceService.Get('GetEncryptedCoupon').subscribe(response => this.SetAction('ENCRYPTEDCOUPON', startTime, response),
          error => this.Error('ENCRYPTEDCOUPON', startTime, error));
        break;
      case 'CHECKCASHIER':
        this.Clear('CHECKCASHIER');
        this.items.forEach(element => element.disabled = (element.code === type) ? true : false);
        this.apiServiceService.Get('GetCheckCashier').subscribe(response => this.SetAction('CHECKCASHIER', startTime, response),
          error => this.Error('CHECKCASHIER', startTime, error));
        break;
    }
  }

  async SendAll(): Promise<void> {
    this.Clear('COUPON');
    this.Clear('CHECKCOUPON');
    this.Clear('ISSUECOUPON');
    this.Clear('ENCRYPTEDCOUPON');
    this.Clear('CHECKCASHIER');
    let startTime = null;
    this.disabledAll = true;
    this.items.forEach(element => element.disabled = true);
    startTime = new Date();
    this.SetAction('COUPON', startTime, await this.apiServiceService.Get('GetCoupon').toPromise()
    .catch(error => this.Error('COUPON', startTime, error)));
    startTime = new Date();
    this.SetAction('CHECKCOUPON', startTime, await this.apiServiceService.Get('GetCheckCoupon').toPromise()
    .catch(error => this.Error('CHECKCOUPON', startTime, error)));
    startTime = new Date();
    this.SetAction('ISSUECOUPON', startTime, await this.apiServiceService.Get('GetIssueCoupon').toPromise()
    .catch(error => this.Error('ISSUECOUPON', startTime, error)));
    startTime = new Date();
    this.SetAction('ENCRYPTEDCOUPON', startTime, await this.apiServiceService.Get('GetEncryptedCoupon').toPromise()
    .catch(error => this.Error('ENCRYPTEDCOUPON', startTime, error)));
    startTime = new Date();
    this.SetAction('CHECKCASHIER', startTime, await this.apiServiceService.Get('GetCheckCashier').toPromise()
    .catch(error => this.Error('CHECKCASHIER', startTime, error)));
    this.disabledAll = false;
  }

}
