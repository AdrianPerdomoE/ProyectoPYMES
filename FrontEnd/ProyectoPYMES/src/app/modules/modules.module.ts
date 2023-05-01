import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './app-pymes/components/product/product.component';

@NgModule({
  declarations: [ProductComponent],
  imports: [CommonModule],
  exports:[ProductComponent]
})
export class ModulesModule {}
