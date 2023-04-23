import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PYMELogComponent } from './modules/app-pymes/pages/pymelog/pymelog.component';
import { ClientViewComponent } from './modules/app-client/pages/client-view/client-view.component';
import { ClientGuard } from './shared/guards/Client.guard';
import { RegisterComponent } from './modules/app-client/components/register/register.component';
import { client_rutes } from './shared/routes/Client.rutes';

const routes: Routes = [
  { path: 'PYME_HOME', component: PYMELogComponent },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ClientViewComponent,
    canActivate: [ClientGuard],
    children: [{ path: 'Register', component: RegisterComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
