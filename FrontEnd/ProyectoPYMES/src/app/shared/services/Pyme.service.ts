import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Global } from "../constants/Global";
import { Pyme } from "../models/Pyme";


@Injectable({
  providedIn: 'root'
})
export class PymeService {

  public url: string;
  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }
  
  registerPyme(Pyme: Pyme): Observable<any> {
    let params = JSON.stringify(Pyme)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${this.url}savePyme`, params, { headers: headers })
  }

  getPyme(id: string): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.get(`${this.url}getPyme/${id}`, { headers: headers });
  }

  getPymes(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.get(`${this.url}getPymes`, { headers: headers });
  }
}
