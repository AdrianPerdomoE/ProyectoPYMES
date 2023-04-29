import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../constants/Global';
import { Transaction } from '../models/Transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  public url: string;
  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  registerTransaction(transaction: Transaction): Observable<any> {
    let params = JSON.stringify(transaction);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${this.url}saveTransaction`, params, {
      headers: headers,
    });
  }

  getTransaction(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(`${this.url}getTransaction/${id}`, {
      headers: headers,
    });
  }

  getTransactionsPyme(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(`${this.url}getTransactionsPyme/${id}`, {
      headers: headers,
    });
  }
  getTransactionsUser(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(`${this.url}getTransactionsUser/${id}`, {
      headers: headers,
    });
  }
}
