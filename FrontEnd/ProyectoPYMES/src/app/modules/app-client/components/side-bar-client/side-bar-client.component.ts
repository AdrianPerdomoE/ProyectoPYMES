import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar-client',
  templateUrl: './side-bar-client.component.html',
  styleUrls: ['./side-bar-client.component.css'],
})
export class SideBarClientComponent implements OnInit {
  constructor(private _router:Router) {}

  ngOnInit(): void {
    this._router.navigate(['MyProfile']);
  }
  toggle() {
    let wrapper = document.getElementById('wrapper');
    if (wrapper) {
      wrapper.classList.toggle('toggled');
    }
  }
  cerrar(){
    sessionStorage.clear();
    this._router.navigateByUrl('/Home');
  }
}
