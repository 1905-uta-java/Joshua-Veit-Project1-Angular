import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileTabComponent } from './components/tabs/profile-tab/profile-tab.component';
import { MyRequestsTabComponent } from './components/tabs/my-requests-tab/my-requests-tab.component';
import { EmployeesTabComponent } from './components/tabs/employees-tab/employees-tab.component';

const routes: Routes = [
  {
    path: "profile",
    component: ProfileTabComponent
  },
  {
    path: "my-requests",
    component: MyRequestsTabComponent
  },
  {
    path: "employees",
    component: EmployeesTabComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
