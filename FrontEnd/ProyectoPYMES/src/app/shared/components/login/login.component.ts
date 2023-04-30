import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PymeService } from '../../services/Pyme.service';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/Notification.service';
import { Observable, iif, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { SesionService } from '../../services/Sesion.service';
import { User } from '../../models/User';
import { Sesion } from '../../models/Sesion';
import { Pyme } from '../../models/Pyme';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [NgbModal],
})
export class LoginComponent implements OnInit {
  public invalidEmail: boolean = false;
  public email: string = '';
  public password: string = '';
  constructor(
    private modalService: NgbModal,
    private _PymeService: PymeService,
    private _UserService: UserService,
    private _notificationService: NotificationService,
    private _sessionService: SesionService
  ) {}

  ngOnInit(): void {}
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }
  verifyEmail(email: string) {
    let patron = new RegExp(
      '^[a-z]+[a-z0-9._-]+@[a-z]+[.]+(.[a-z]+)*(.[a-z]{2,5})$'
    );
    this.invalidEmail = !patron.test(email);
  }
  log(modal: any) {
    const returnFalse = (): Observable<any> => {
      return of({ Exist: false });
    };
    this._PymeService
      .emailExistence(this.email)
      .pipe(
        mergeMap((resultado: any) =>
          iif(
            () => resultado.Exist,
            this._PymeService.confirmPassword(this.email, this.password),
            this._UserService
              .emailExistence(this.email)
              .pipe(
                mergeMap((res) =>
                  iif(
                    () => res.Exist,
                    this._UserService.confirmPassword(
                      this.email,
                      this.password
                    ),
                    returnFalse()
                  )
                )
              )
          )
        )
      )
      .pipe(tap((taped) => console.log(taped)))
      .subscribe((re: any) => {
        if (re?.Exist == false) {
          this._notificationService.enviarAlerta(
            'warning',
            'Inicio de sesión',
            'El correo ingresado no esta vinculado a una cuenta en el sistema'
          );
          return;
        }
        if (re.passwordIsCorrect) {
          let session;
          if (re.type == 'Pyme') {
            session = new Pyme(
              re.LOGGED._id,
              re.LOGGED.name,
              re.LOGGED.category,
              re.LOGGED.pageStyle,
              re.LOGGED.creationDate
            );
          } else {
            session = new User(
              re.LOGGED._id,
              re.LOGGED.name,
              re.LOGGED.password,
              re.LOGGED.email,
              re.LOGGED.shoppingKart
            );
          }
          console.log(typeof session);
          this._sessionService.logSesion(session);
        } else {
          this._notificationService.enviarAlerta(
            'warning',
            'Inicio de sesión',
            'la contraseña es incorrecta'
          );
        }
      });

    modal.close('Close click');
  }
}
