import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileTabComponent } from './components/tabs/profile-tab/profile-tab.component';
import { MyRequestsTabComponent } from './components/tabs/my-requests-tab/my-requests-tab.component';
import { EmployeesTabComponent } from './components/tabs/employees-tab/employees-tab.component';
import { EmployeeRequestsTabComponent } from './components/tabs/employee-requests-tab/employee-requests-tab.component';
import { EmployeeHomeTabComponent } from './components/tabs/employee-home-tab/employee-home-tab.component';
import { ManagerHomeTabComponent } from './components/tabs/manager-home-tab/manager-home-tab.component';
import { LoginComponent } from './components/login/login.component';
import { HomepageManagerComponent } from './components/homepage-manager/homepage-manager.component';
import { HomepageEmployeeComponent } from './components/homepage-employee/homepage-employee.component';
import { ChangeEmailTabComponent } from './components/tabs/change-email-tab/change-email-tab.component';
import { ChangePasswordTabComponent } from './components/tabs/change-password-tab/change-password-tab.component';
import { EditProfileTabComponent } from './components/tabs/edit-profile-tab/edit-profile-tab.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "homepage-manager",
    component: HomepageManagerComponent,
    children: [
      {
        path: "profile",
        component: ProfileTabComponent,
        children: [
          {
            path: "change-email",
            component: ChangeEmailTabComponent
          },
          {
            path: "change-password",
            component: ChangePasswordTabComponent
          },
          {
            path: "edit-profile",
            component: EditProfileTabComponent
          },
        ]
      },
      {
        path: "my-requests",
        component: MyRequestsTabComponent
      },
      {
        path: "employees",
        component: EmployeesTabComponent
      },
      {
        path: "employee-requests",
        component: EmployeeRequestsTabComponent
      },
      {
        path: "",
        component: ManagerHomeTabComponent
      }
    ]
  },
  {
    path: "homepage-employee",
    component: HomepageEmployeeComponent,
    children: [
      {
        path: "profile",
        component: ProfileTabComponent,
        children: [
          {
            path: "change-email",
            component: ChangeEmailTabComponent
          },
          {
            path: "change-password",
            component: ChangePasswordTabComponent
          },
          {
            path: "edit-profile",
            component: EditProfileTabComponent
          },
        ]
      },
      {
        path: "my-requests",
        component: MyRequestsTabComponent
      },
      {
        path: "",
        component: EmployeeHomeTabComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
