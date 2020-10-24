import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiServiceService } from 'app/services/api-service.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-saletranction',
  templateUrl: './saletranction.component.html',
  styleUrls: ['./saletranction.component.css']
})
export class SaletranctionComponent implements OnInit {

  @ViewChild('Monitor', { static: false }) Monitor: ModalDirective;

  constructor(private apiServiceService: ApiServiceService) { }

  items = [
    { code: 'ENCRYPTEDSAVE', name: 'Encrypted Save', status: null, date: null, time: null, response: null, disabled: false },
    { code: 'SAVEAPI',       name: 'Save (api service)', status: null, date: null, time: null, response: null, disabled: false }

  ];

  response: any;

  disabledAll: boolean;

  ngOnInit(): void {
  }

  Refresh(): void {
    this.Clear('ENCRYPTEDSAVE');
    this.Clear('SAVEAPI');
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
      case 'ENCRYPTEDSAVE':
        this.response = this.items.filter(element => element.code === 'ENCRYPTEDSAVE')[0].response;
        break;
      case 'SAVEAPI':
        this.response = this.items.filter(element => element.code === 'SAVEAPI')[0].response;
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
      case 'ENCRYPTEDSAVE':
        this.Clear('ENCRYPTEDSAVE');
        this.items.forEach(element => element.disabled = (element.code === type) ? true : false);
        this.apiServiceService.Get('GetEncryptedSave').subscribe(response => this.SetAction('ENCRYPTEDSAVE', startTime, response),
          error => this.Error('ENCRYPTEDSAVE', startTime, error));
        break;
      case 'SAVEAPI':
        this.Clear('SAVEAPI');
        this.items.forEach(element => element.disabled = (element.code === type) ? true : false);
        this.apiServiceService.Get('GetSaveApi').subscribe(response => this.SetAction('SAVEAPI', startTime, response),
          error => this.Error('SAVEAPI', startTime, error));
        break;
    }
  }

  async SendAll(): Promise<void> {
    this.Clear('ENCRYPTEDSAVE');
    this.Clear('SAVEAPI');
    let startTime = null;
    this.disabledAll = true;
    this.items.forEach(element => element.disabled = true);
    startTime = new Date();
    this.SetAction('ENCRYPTEDSAVE', startTime, await this.apiServiceService.Get('GetEncryptedSave').toPromise()
    .catch(error => this.Error('ENCRYPTEDSAVE', startTime, error)));
    startTime = new Date();
    this.SetAction('SAVEAPI', startTime, await this.apiServiceService.Get('GetSaveApi').toPromise()
    .catch(error => this.Error('SAVEAPI', startTime, error)));
    this.disabledAll = false;
  }

}
