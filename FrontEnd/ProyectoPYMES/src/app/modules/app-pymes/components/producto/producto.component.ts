import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  @Input() product!: Product;
  constructor() {}

  ngOnInit(): void {}
  addItem(amount: string) {}
}
