import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientViewComponent } from './pages/client-view/client-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterComponent } from './components/register/register.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ClientViewComponent, RegisterComponent],
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
})
export class AppClientModule {}
