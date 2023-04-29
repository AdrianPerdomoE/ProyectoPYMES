import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TapToTopComponent } from './components/tap-to-top/tap-to-top.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [DashboardComponent, TapToTopComponent],
  imports: [CommonModule, RouterModule, HttpClientModule, BrowserModule,ToastrModule.forRoot(),BrowserAnimationsModule],
  bootstrap: [],
  exports: [DashboardComponent, TapToTopComponent],
})
export class SharedModule {}
