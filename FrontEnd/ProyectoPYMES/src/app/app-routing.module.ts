import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { client_rutes } from './shared/routes/Client.rutes';
import { PYMELogComponent } from './modules/app-pymes/pages/pymelog/pymelog.component';
import { ClientViewComponent } from './modules/app-client/pages/client-view/client-view.component';
import { ClientGuard } from './shared/guards/Client.guard';
import { RegisterComponent } from './modules/app-client/components/register/register.component';
import { HomeComponent } from './modules/app-client/components/home/home.component';
import { PymeDesignComponent } from './modules/app-pymes/components/pyme-design/pyme-design.component';
import { ShoppingKartComponent } from './shared/components/shopping-kart/shopping-kart.component';
import { SideBarClientComponent } from './modules/app-client/components/side-bar-client/side-bar-client.component';
import { ProfileComponent } from './modules/app-client/components/profile/profile.component';
import { WalletViewComponent } from './shared/components/wallet-view/wallet-view.component';
import { EditProductComponent } from './modules/app-pymes/components/edit-product/edit-product.component';
import { AddProductComponent } from './modules/app-pymes/components/add-product/add-product.component';

const routes: Routes = [
  {
    path: 'PYME_HOME',
    component: PYMELogComponent,
    children: [
      { path: 'Product/:id', component: EditProductComponent },
      { path: 'AddProduct', component: AddProductComponent },
    ],
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ClientViewComponent,
    canActivate: [ClientGuard],
    children: [
      { path: 'Register', component: RegisterComponent },
      { path: 'Home', component: HomeComponent },
      { path: 'Pyme/:name/:id', component: PymeDesignComponent },
      { path: 'ShoppingKart', component: ShoppingKartComponent },
      {
        path: 'Profile',
        component: SideBarClientComponent,
        children: [
          { path: 'MyProfile', component: ProfileComponent },
          { path: 'Wallet', component: WalletViewComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
