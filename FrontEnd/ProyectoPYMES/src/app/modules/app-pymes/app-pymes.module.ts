import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PYMELogComponent } from './pages/pymelog/pymelog.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { FormsModule } from '@angular/forms';
import { ProductoComponent } from './components/producto/producto.component';
import { PymeDesignComponent } from './components/pyme-design/pyme-design.component';

@NgModule({
  declarations: [PYMELogComponent, ProductoComponent, PymeDesignComponent],
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
})
export class AppPYMESModule {}
