import { Component, Input, OnInit } from '@angular/core';
import { Pyme } from 'src/app/shared/models/Pyme';

@Component({
  selector: 'app-card-pyme',
  templateUrl: './card-pyme.component.html',
  styleUrls: ['./card-pyme.component.css']
})
export class CardPymeComponent implements OnInit {
  @Input() pyme!: Pyme;
  constructor() { }
  
  ngOnInit(): void {
  }

}
