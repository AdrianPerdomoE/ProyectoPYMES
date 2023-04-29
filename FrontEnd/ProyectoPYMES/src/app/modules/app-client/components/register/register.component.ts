import { Component, OnInit } from '@angular/core';
import { Observable, ObservableInput, from } from 'rxjs';
import { concatMap, filter } from 'rxjs/operators';
import { User } from 'src/app/shared/models/User';
import { NotificationService } from 'src/app/shared/services/Notification.service';
import { PymeService } from 'src/app/shared/services/Pyme.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public auxUser: User = new User('', '', '', '');
  public invalidEmail: boolean = false;
  constructor(
    private _PymeService: PymeService,
    private _UserService: UserService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {}
  verifyEmail(email: string) {
    let patron = new RegExp('^[a-z]+[a-z0-9._-]+@[a-z]+.[a-z.]{2,5}$');
    this.invalidEmail = !patron.test(email);
  }
  agree(checked: any) {}
  onRegistry() {
    const returnTrue = (): ObservableInput<any> => {
      return new Observable((observer) => {
        return observer.next({ Exist: true });
      });
    };
    from(
      this._PymeService.emailExistence(
        this.auxUser.email ? this.auxUser.email : ''
      )
    )
      .pipe(
        filter((resultado) => resultado.Exist === false),
        concatMap(() =>
          this._UserService.emailExistence(
            this.auxUser.email ? this.auxUser.email : ''
          )
        ),
        filter((resultado) => resultado.Exist === true),
        concatMap(() => returnTrue())
      )
      .subscribe((re: any) => {
        console.log(1);
        if (re.Exist == false) {
          this._UserService.registerUser(this.auxUser).subscribe((resul) => {
            if (resul.USER) {
              this._notificationService.enviarAlertaConfirmacion(
                'Registro',
                'Su usuario ha sido creado correctamente'
              );
              this.auxUser = new User('', '', '', '');
            } else {
              this._notificationService.enviarAlerta(
                'error',
                'Registro',
                'No fue posible crear el usuario por un problema en el sistema'
              );
            }
          });
        } else {
          this._notificationService.enviarAlerta(
            'warning',
            'Registro',
            'El correo ingresado ya esta vinculado a una cuenta en el sistema'
          );
        }
      });
  }
}
