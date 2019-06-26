import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomepageEmployeeComponent } from './components/homepage-employee/homepage-employee.component';
import { HomepageManagerComponent } from './components/homepage-manager/homepage-manager.component';
import { ProfileTabComponent } from './components/tabs/profile-tab/profile-tab.component';
import { MyRequestsTabComponent } from './components/tabs/my-requests-tab/my-requests-tab.component';
import { EmployeeRequestsTabComponent } from './components/tabs/employee-requests-tab/employee-requests-tab.component';
import { EmployeesTabComponent } from './components/tabs/employees-tab/employees-tab.component';
import { EmployeeHomeTabComponent } from './components/tabs/employee-home-tab/employee-home-tab.component';
import { ManagerHomeTabComponent } from './components/tabs/manager-home-tab/manager-home-tab.component';
import { ChangeEmailTabComponent } from './components/tabs/change-email-tab/change-email-tab.component';
import { ChangePasswordTabComponent } from './components/tabs/change-password-tab/change-password-tab.component';
import { EditProfileTabComponent } from './components/tabs/edit-profile-tab/edit-profile-tab.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageEmployeeComponent,
    HomepageManagerComponent,
    ProfileTabComponent,
    MyRequestsTabComponent,
    EmployeeRequestsTabComponent,
    EmployeesTabComponent,
    EmployeeHomeTabComponent,
    ManagerHomeTabComponent,
    ChangeEmailTabComponent,
    ChangePasswordTabComponent,
    EditProfileTabComponent,
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
