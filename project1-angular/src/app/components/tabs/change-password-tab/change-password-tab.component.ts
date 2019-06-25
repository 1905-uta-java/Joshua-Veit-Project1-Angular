import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password-tab',
  templateUrl: './change-password-tab.component.html',
  styleUrls: ['./change-password-tab.component.css']
})
export class ChangePasswordTabComponent implements OnInit {

  errorMessage: string;

  oldPassword: string;
  newPassword1: string;
  newPassword2: string;

  constructor(private empService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.oldPassword = null;
    this.newPassword1 = null;
    this.newPassword2 = null;
    this.errorMessage = null;
  }

  submit() {

    this.errorMessage = null;

    if(!this.isPasswordValid(this.oldPassword)) {

      this.errorMessage = "Invalid old password";
      return;
    }

    if(!this.isPasswordValid(this.newPassword1)) {

      this.errorMessage = "Invalid new Password";
      return;
    }

    if(this.newPassword1 === this.oldPassword) {

      this.errorMessage = "New password cannot match old password";
      return;
    }

    if(this.newPassword1 !== this.newPassword2) {
      
      this.errorMessage = "New passwords must match";
      return;
    }

    this.empService.updatePassword(this.oldPassword, this.newPassword1, (result) => {

        console.log("changed password");

        if(sessionStorage.getItem("userType") === "manager")
          this.router.navigate(['homepage-manager/profile']);
        else
          this.router.navigate(['homepage-employee/profile']);

      }, (error) => {
        switch(error.error) {
          case "missing oldPassword":
            this.errorMessage = "Please enter your old password";
            break;
          case "incorrect oldPassword":
            this.errorMessage = "incorrect old password";
            break;
          case "missing newPassword":
            this.errorMessage = "Please enter a new password";
            break;
          case "invalid newPassword":
            this.errorMessage = "new password is invalid";
            break;
          case "invalid authToken":
            sessionStorage.clear();
            this.router.navigate(['login']);
            break;
          default:
            console.log(error.error);
      }
    });
  }

  isPasswordValid(password: string) {
    return password && password.length >= 6 && password.length <= 12;
  }

  doPasswordsMatch(password1: string, password2: string) {
    return password1 === password2;
  }

  isPending() {
    return Boolean(sessionStorage.getItem("pending"));
  }
}
