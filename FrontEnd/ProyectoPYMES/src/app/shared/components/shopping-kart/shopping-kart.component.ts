import { Component, OnInit } from '@angular/core';
import { Kart } from '../../models/Kart';
import { SesionService } from '../../services/Sesion.service';
import { KartService } from '../../services/Kart.service';

@Component({
  selector: 'app-shopping-kart',
  templateUrl: './shopping-kart.component.html',
  styleUrls: ['./shopping-kart.component.css'],
})
export class ShoppingKartComponent implements OnInit {
  kart: Kart = new Kart(0, [], 0);
  address = '';
  constructor(
    private _sessionService: SesionService,
    private _kartService: KartService
  ) {}

  ngOnInit(): void {
    let sessionKart = this._kartService.getCartSession();
    if (!this._sessionService.confirmOpenSesion()) {
      this.kart = sessionKart;
    } else {
      let session = this._sessionService.getCurrentUser();
      if (sessionKart) {
        this._kartService
          .getCartServer(session?._id ? session?._id : '')
          .subscribe((server) => {
            let kartServer = server.KART;
            if (kartServer) {
              this._kartService.mixKarts(kartServer);
              this._kartService
                .updateCarServer(kartServer)
                .subscribe((resp) => {
                  this.kart = resp.KART;
                });
            }
          });
      }
    }

    this._kartService.carritoState.subscribe((kartNext) => {
      this.kart = kartNext;
    });
  }
  remove(index: number) {
    let sessionKart = this._kartService.getCartSession();
    this._kartService.removeCartItem(index, this.kart);
    if (this._sessionService.confirmOpenSesion()) {
      this._kartService.updateCarServer(this.kart).subscribe((res) => {
        if (res.KART) {
          this._kartService.carritoState.next(res.KART);
        }
      });
    } else {
      this._kartService.updateCarSession(this.kart);
    }
  }
}
