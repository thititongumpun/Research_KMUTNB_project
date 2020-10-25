import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-totalcal',
  templateUrl: './totalcal.component.html',
  styleUrls: ['./totalcal.component.css']
})
export class TotalcalComponent implements OnInit {

  @ViewChild('Monitor') public Monitor: ModalDirective;

  constructor(private apiServiceService: ApiServiceService) { }

  disabledAll = false;

  startTime: any;
  endTime: any;


  response: any;

  items = [
    { code: 'MONGODB Read', name: 'MONGODB Read', status: null, date: null, time: null, response: null, disabled: false },
    { code: 'SQL Read', name: 'SQL Read', status: null, date: null, time: null, response: null, disabled: false },
    { code: 'MONGODB INSERT 1 ROW', name: 'MONGODB INSERT 1 Row', status: null, date: null, time: null, response: null, disabled: false },
    { code: 'SQL INSERT 1 ROW', name: 'SQL INSERT 1 ROW', status: null, date: null, time: null, response: null, disabled: false },
    { code: 'MONGODB INSERT 500 ROWS', name: 'MONGODB INSERT 500 ROWS', status: null, date: null, time: null, response: null, disabled: false },
    { code: 'SQL INSERT 500 ROWS', name: 'SQL INSERT 500 ROWS', status: null, date: null, time: null, response: null, disabled: false },
    { code: 'MONGODB Filter', name: 'MONGODB Filter', status: null, date: null, time: null, response: null, disabled: false },
    { code: 'SQL Filter', name: 'SQL Filter', status: null, date: null, time: null, response: null, disabled: false },
    { code: 'MONGODB Delete', name: 'MONGODB Delete', status: null, date: null, time: null, response: null, disabled: false },
    { code: 'SQL Delete', name: 'SQL Delete', status: null, date: null, time: null, response: null, disabled: false },
  ];

  ngOnInit(): void {
  }

  Refresh(): void {
    this.Clear('MONGODB Read');
    this.Clear('MONGODB INSERT 1 ROW');
    this.Clear('MONGODB INSERT 500 ROWS');
    this.Clear('MONGODB Filter');
    this.Clear('MONGODB Delete');
    this.Clear('SQL Read');
    this.Clear('SQL INSERT 1 ROW');
    this.Clear('SQL INSERT 500 ROWS');
    this.Clear('SQL Filter');
    this.Clear('SQL Delete');
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
      case 'MONGODB Read':
        this.response = this.items.filter(element => element.code === 'MONGODB Read')[0].response;
        break;
      case 'MONGODB INSERT 1 ROW':
        this.response = this.items.filter(element => element.code === 'MONGODB INSERT 1 ROW')[0].response;
        break;
      case 'MONGODB INSERT 500 ROWS':
        this.response = this.items.filter(element => element.code === 'MONGODB INSERT 1 ROW')[0].response;
        break;
      case 'MONGODB Filter':
        this.response = this.items.filter(element => element.code === 'MONGODB Filter')[0].response;
        break;
      case 'MONGODB Delete':
        this.response = this.items.filter(element => element.code === 'MONGODB Filter')[0].response;
        break;
      case 'SQL INSERT 1 ROW':
        this.response = this.items.filter(element => element.code === 'SQL INSERT 1 ROW')[0].response;
        break;
      case 'SQL INSERT 500 ROWS':
        this.response = this.items.filter(element => element.code === 'SQL INSERT 500 ROWS')[0].response;
        break;
      case 'SQL Read':
        this.response = this.items.filter(element => element.code === 'SQL Read')[0].response;
        break;
      case 'SQL Filter':
        this.response = this.items.filter(element => element.code === 'SQL Filter')[0].response;
        break;
      case 'SQL Delete':
        this.response = this.items.filter(element => element.code === 'SQL Delete')[0].response;
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
        element.status = (response.Name === 'ma') ? false : true;
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
      case 'MONGODB Read':
        this.Clear('MONGODB Read');
        this.items.forEach(element => element.disabled = (element.code === type) ? true : false);
        this.apiServiceService.Get('Customer').subscribe(response => this.SetAction('MONGODB Read', startTime, response),
        error => this.Error('MONGODB Read', startTime, error));
        break;
      case 'MONGODB INSERT 1 ROW':
        this.Clear('MONGODB INSERT 1 ROW');
        this.items.forEach(element => element.disabled = (element.code === type) ? true : false);
        this.apiServiceService.PostNOSQL('Customer').subscribe(response => this.SetAction('MONGODB INSERT 1 ROW', startTime, response),
        error => this.Error('MONGODB INSERT 1 ROW', startTime, error));
        break;
      case 'MONGODB INSERT 500 ROWS':
        for (let i = 0; i < 500; i++) {
          this.Clear('SQL INSERT 500 ROW');
          this.items.forEach(element => element.disabled = (element.code === type) ? true : false);
          this.apiServiceService.Post('Customer').subscribe(response => this.SetAction('MONGODB INSERT 500 ROWS', startTime, response),
          error => this.Error('MONGODB INSERT 500 ROWS', startTime, error));
        }
        break;
      case 'MONGODB Filter':
        this.Clear('MONGODB Filter');
        this.items.forEach(element => element.disabled = (element.code === type) ? true : false);
        this.apiServiceService.Filter('Customer/55').subscribe(response => this.SetAction('MONGODB Filter', startTime, response),
        error => this.Error('MONGODB IFilter', startTime, error));
        break;
        case 'MONGODB Delete':
          this.Clear('MONGODB Delete');
          this.items.forEach(element => element.disabled = (element.code === type) ? true : false);
          this.apiServiceService.DeleteSQL('Customer/55').subscribe(response => this.SetAction('MONGODB Delete', startTime, response),
          error => this.Error('MONGODB Delete', startTime, error));
          break;
      case 'SQL INSERT 1 ROW':
        this.Clear('SQL INSERT 1 ROW');
        this.items.forEach(element => element.disabled = (element.code === type) ? true : false);
        this.apiServiceService.PostSQL('Customers').subscribe(response => this.SetAction('SQL INSERT 1 ROW', startTime, response),
        error => this.Error('SQL INSERT 1 ROW', startTime, error));
        break;
      case 'SQL INSERT 500 ROWS':
        for (let i = 0; i < 500; i++){
          this.Clear('SQL INSERT 500 ROWS');
          this.items.forEach(element => element.disabled = (element.code === type) ? true : false);
          this.apiServiceService.PostSQLROW('Customers').subscribe(response => this.SetAction('SQL INSERT 500 ROWS', startTime, response),
          error => this.Error('SQL INSERT 500 ROWS', startTime, error));
        }
        break;
      case 'SQL Read':
        this.Clear('SQL Read');
        this.items.forEach(element => element.disabled = (element.code === type) ? true : false);
        this.apiServiceService.Get('Customers').subscribe(response => this.SetAction('SQL Read', startTime, response),
        error => this.Error('SQL Read', startTime, error));
        break;
      case 'SQL Filter':
        this.Clear('SQL Filter');
        this.items.forEach(element => element.disabled = (element.code === type) ? true : false);
        this.apiServiceService.Filter('Customers/55').subscribe(response => this.SetAction('SQL Filter', startTime, response),
        error => this.Error('SQL Filter', startTime, error));
        break;
      case 'SQL Delete':
        this.Clear('SQL Delete');
        this.items.forEach(element => element.disabled = (element.code === type) ? true : false);
        this.apiServiceService.DeleteSQL('Customers/Iphone').subscribe(response => this.SetAction('SQL Delete', startTime, response),
        error => this.Error('SQL Delete', startTime, error));
        break;
    }
  }

  ClearSQL(): void {
    this.apiServiceService.ClearSQL('Customers/drop').subscribe(response => console.log(response));
  }

  ClearMongoDB(): void {
    this.apiServiceService.ClearMongoDB('Customer/drop').subscribe(response => console.log(response));
  }
}
