import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PYMELogComponent } from './pages/pymelog/pymelog.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PymeViewComponent } from './components/pyme-view/pyme-view.component';
import { ProductComponent } from './components/product/product.component';
import { FormsModule } from '@angular/forms';
import { ModulesModule } from '../modules.module';

@NgModule({
  declarations: [PYMELogComponent, PymeViewComponent],
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ModulesModule
  ],
  exports: [],
})
export class AppPYMESModule {}
