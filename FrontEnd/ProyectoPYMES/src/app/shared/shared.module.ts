import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TapToTopComponent } from './components/tap-to-top/tap-to-top.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [DashboardComponent, TapToTopComponent],
  imports: [CommonModule, RouterModule],
  bootstrap:[],
  exports: [DashboardComponent, TapToTopComponent],
})
export class SharedModule {}
