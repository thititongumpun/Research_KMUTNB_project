import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl;

  Get(url): Observable<any> {
    return this.http.get(this.baseUrl + url)
  }

  Filter(url): Observable<any> {
    return this.http.get(this.baseUrl + url)
  }

  Post(url): Observable<any> {
    const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*' };
    return this.http.post(this.baseUrl + url, { headers: headers }, {})
  }

  PostNOSQL(url): Observable<any> {
    const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*' };

    let body = {
      "CUS_ID": 12345,
      "SHOP_ID": 55,
      "PRODUCTTYPE": "Computers" ,
      "phone": "123-555-555",
    }
    return this.http.post(this.baseUrl + url, body,{ headers: headers })
  }

  PostSQL(url): Observable<any> {
    const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*' };
    return this.http.post(this.baseUrl + url, { headers: headers }, {})
  }

  PostSQL1ROW(url): Observable<any> {
    const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*' };
    return this.http.post(this.baseUrl + url, {
      "Cus_name": "eiei",
      "gender": "m",
      "address": "dasd",
      "phone": "123",
      "email": "dsadas"
    },{ headers: headers })
  }

  DeleteSQL(url): Observable<any> {
    return this.http.delete(this.baseUrl + url)
  }
}