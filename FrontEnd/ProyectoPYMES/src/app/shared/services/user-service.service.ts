import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/User";
import { Global } from "../constants/Global";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public url: string;
    constructor(private _http: HttpClient) {
        this.url = Global.url;
    }

    registerUser(user: User): Observable<any> {
        let body = JSON.stringify(user)
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(`${this.url}USave`, body, { headers: headers })
    }

    getUsers(): Observable<any> {
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.get(`${this.url}users`, { headers: headers });
    }

    getUser(email: string): Observable<any> {
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.get(`${this.url}user/${email}`, { headers: headers });
    }

    updateUser(user: User): Observable<any> {
        let body = JSON.stringify(user)
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.put(`${this.url}user/${user._id}`, body, { headers: headers });
    }

    emailExistence(email: string): Observable<any> {
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.get(`${this.url}emailExistence/${email}`, { headers: headers });
    }

    confirmPassword(email: string, password: string): Observable<any> {
        let body = JSON.stringify({ email, password })
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this._http.post(`${this.url}confirmPassword`, body, { headers: headers });
    }
}
