import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar-client',
  templateUrl: './side-bar-client.component.html',
  styleUrls: ['./side-bar-client.component.css'],
})
export class SideBarClientComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  toggle() {
    let wrapper = document.getElementById('wrapper');
    if (wrapper) {
      wrapper.classList.toggle('toggled');
    }
  }
}
