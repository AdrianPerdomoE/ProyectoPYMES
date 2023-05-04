import { Component, OnInit } from '@angular/core';
import { Kart } from '../../models/Kart';
import { SesionService } from '../../services/Sesion.service';

@Component({
  selector: 'app-shopping-kart',
  templateUrl: './shopping-kart.component.html',
  styleUrls: ['./shopping-kart.component.css'],
})
export class ShoppingKartComponent implements OnInit {
  kart: Kart = new Kart(0, [], 0);
  address = '';
  constructor(private _sesionService:SesionService) {}

  ngOnInit(): void {}
}
