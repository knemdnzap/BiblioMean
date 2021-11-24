import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { RegisterComponent } from './home/register/register.component';
import { LoginComponent } from './home/login/login.component';
import { SaveBookComponent } from './book/save-book/save-book.component';
import { ListBookComponent } from './book/list-book/list-book.component';
import { RegisterClientComponent } from './admin/register-client/register-client.component';
import { ListClientComponent } from './admin/list-client/list-client.component';
import { UpdateClientComponent } from './admin/update-client/update-client.component';
import { ListVendorComponent } from './admin/list-vendor/list-vendor.component';
import { RegisterVendorComponent } from './admin/register-vendor/register-vendor.component';
import { UpdateVendorComponent } from './admin/update-vendor/update-vendor.component';
import { UpdateRoleComponent } from './admin/update-role/update-role.component';
import { RegisterRoleComponent } from './admin/register-role/register-role.component';
import { ListRoleComponent } from './admin/list-role/list-role.component';

import { ClientService } from "./services/client.service";
import { BookService } from "./services/book.service";
import { RoleService } from "./services/role.service";
import { VendorService } from "./services/vendor.service";
import { TokenInterceptorService } from "./services/token-interceptor.service";

import { AuthGuard } from "./guard/auth.guard";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    SaveBookComponent,
    ListBookComponent,
    RegisterClientComponent,
    ListClientComponent,
    UpdateClientComponent,
    ListVendorComponent,
    RegisterVendorComponent,
    UpdateVendorComponent,
    UpdateRoleComponent,
    RegisterRoleComponent,
    ListRoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ClientService,
    BookService,
    RoleService,
    VendorService,
    TokenInterceptorService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
