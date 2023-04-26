import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable , Subject} from "rxjs";
import { Kart } from "../models/Kart";
import { Global } from "../constants/Global"
import { KartItem } from "../models/KartItem";
import { Product } from "../models/Product";
import { SesionService } from "./Sesion.service";

@Injectable({
  providedIn: 'root'
})
export class KartLoggedService {
  public url: string;
  constructor(private _http: HttpClient,private _sessionService:SesionService) {
    this.url = Global.url;
  }

  public carritoState = new Subject<Kart>() ;
  saveCart(kart: Kart): Observable<any> {
    let params = JSON.stringify(kart)
    let id = this._sessionService.getCurrentUser()?._id
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(`${this.url}updateKart/${id}`, params, { headers: headers })
  }

  getCart(id: string): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.get(`${this.url}getCart/${id}`, { headers: headers });
  }

  updateCar(kart: Kart): Observable<any> {
    this.carritoState.next(kart)
    let params = JSON.stringify(kart)
    let id = this._sessionService.getCurrentUser()?._id
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(`${this.url}updateKart/${id}`, params, { headers: headers })
  }

  calculateNewToPay(kart: Kart) {
    if (kart.items.length == 0) {
      kart.toPay = 0
      return
    }
    kart.toPay = kart.items.map(itm => { return  itm.amount * itm.product.price }).reduce((prev, curr) => { return curr + prev })
  }
  emptyCart(kart: Kart): Observable<any> {
    let newKart = new Kart(0,[],0);
    this.carritoState.next(newKart);
    let params = JSON.stringify(newKart)
    let id = this._sessionService.getCurrentUser()?._id
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(`${this.url}updateKart/${id}`, params, { headers: headers })
  }

  changeAmount(index: number, amount: number, kart: Kart): Kart {
    let cartItem = kart.items.at(index);
    if (!cartItem) return kart;
    if (amount === 0) {
      this.removeCartItem(index, kart)
    }
    else if (amount > 100) {
      cartItem.amount = 100
    }
    else {
      cartItem.amount = amount
    }
    this.calculateNewToPay(kart)
    return kart;
  }

  removeCartItem(index: number, kart: Kart): void {
    kart.items = kart.items.filter((item, ind) => { return ind != index })
    this.calculateNewToPay(kart)
  }

  addCarItem(product: Product, amount: number, storeName: string, storeId: string, kart: Kart): Kart {
    let result = this.lookForItem(product, kart)
    if (this.lookForItem(product, kart) >= 0) {
      kart.items[result].amount += amount
      this.calculateNewToPay(kart)
      return kart;
    }
    let newKartItem = new KartItem(product, amount)
    kart.items.push(newKartItem)
    this.calculateNewToPay(kart)
    return kart;
  }

  private lookForItem(product: Product, kart: Kart): number {
    for (let index = 0; index < kart.items.length; index++) {
      if (kart.items[index].product._id == product._id) {
        return index
      }

    }
    return -1
  }
}
