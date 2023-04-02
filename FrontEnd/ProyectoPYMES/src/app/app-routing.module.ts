import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PYMELogComponent } from './modules/app-pymes/pages/pymelog/pymelog.component';

const routes: Routes = [
  {path:"PYMELog",component:PYMELogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }