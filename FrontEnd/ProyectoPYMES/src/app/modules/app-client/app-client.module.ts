import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientViewComponent } from './pages/client-view/client-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterComponent } from './components/register/register.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { CardPymeComponent } from './components/card-pyme/card-pyme.component';
import { ListPymesComponent } from './components/list-pymes/list-pymes.component';

@NgModule({
  declarations: [
    ClientViewComponent,
    RegisterComponent,
    HomeComponent,
    CardPymeComponent,
    ListPymesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
})
export class AppClientModule {}
