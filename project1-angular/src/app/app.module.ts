import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomepageEmployeeComponent } from './components/homepage-employee/homepage-employee.component';
import { HomepageManagerComponent } from './components/homepage-manager/homepage-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageEmployeeComponent,
    HomepageManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
