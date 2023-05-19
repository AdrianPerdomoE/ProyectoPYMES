import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-pyme',
  templateUrl: './navbar-pyme.component.html',
  styleUrls: ['./navbar-pyme.component.css'],
})
export class NavbarPymeComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {
    this._router.navigate(['PYME_HOME','MyProducts']);
  }
  cerrar() {
    sessionStorage.clear();
    this._router.navigateByUrl('/Home');
  }
}
