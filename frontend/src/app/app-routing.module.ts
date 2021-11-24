import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListClientComponent } from './admin/list-client/list-client.component';
import { ListRoleComponent } from './admin/list-role/list-role.component';
import { ListVendorComponent } from './admin/list-vendor/list-vendor.component';
import { RegisterClientComponent } from './admin/register-client/register-client.component';
import { RegisterRoleComponent } from './admin/register-role/register-role.component';
import { RegisterVendorComponent } from './admin/register-vendor/register-vendor.component';
import { UpdateClientComponent } from './admin/update-client/update-client.component';
import { UpdateRoleComponent } from './admin/update-role/update-role.component';
import { UpdateVendorComponent } from './admin/update-vendor/update-vendor.component';
import { ListBookComponent } from './book/list-book/list-book.component';
import { SaveBookComponent } from './book/save-book/save-book.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },

  {
    path: "listBook",
    component: ListBookComponent,
  },

  {
    path: "saveBook",
    component: SaveBookComponent,
  },

  {
    path: "listClient",
    component: ListClientComponent,
  },

  {
    path: "registerClient",
    component: RegisterClientComponent,
  },

  {
    path: "updateClient",
    component: UpdateClientComponent,
  },

  {
    path: "listRole",
    component: ListRoleComponent,
  },

  {
    path: "registerRole",
    component: RegisterRoleComponent,
  },

  {
    path: "updateRole",
    component: UpdateRoleComponent,
  },

  {
    path: "listVendor",
    component: ListVendorComponent,
  },

  {
    path: "registerVendor",
    component: RegisterVendorComponent,
  },

  {
    path: "updateVendor",
    component: UpdateVendorComponent,
  },

  {
    path: "login",
    component: LoginComponent,
  },

  {
    path: "register",
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
