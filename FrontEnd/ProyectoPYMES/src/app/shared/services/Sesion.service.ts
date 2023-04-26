import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Sesion } from '../models/Sesion';
import { Pyme } from '../models/Pyme';

@Injectable({
  providedIn: 'root',
})
export class SesionService {
  constructor() {}

  logSesion(logger: User | Pyme): void {
    let newSesion = new Sesion(logger);
    let sesionString = JSON.stringify(newSesion);
    sessionStorage.setItem('SESION', sesionString);
  }
  logOut(): void {
    sessionStorage.removeItem('SESION');
  }

  confirmOpenSesion(): Boolean {
    let sesionString = sessionStorage.getItem('SESION');
    if (sesionString) {
      return true;
    }
    return false;
  }
  getCurrentUser(): User | undefined | Pyme {
    let sesionString = sessionStorage.getItem('SESION');
    if (sesionString) {
      let logger: Sesion = JSON.parse(sesionString);
      return logger.CurrentSesion;
    }
    return undefined;
  }
}
