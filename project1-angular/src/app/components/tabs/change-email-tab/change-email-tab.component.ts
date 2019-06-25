import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-email-tab',
  templateUrl: './change-email-tab.component.html',
  styleUrls: ['./change-email-tab.component.css']
})
export class ChangeEmailTabComponent implements OnInit {

  errorMessage: string;
  email: string;
  password: string;

  constructor(private empService: EmployeeService, private router: Router) { }
  
  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    
    if(sessionStorage.getItem("userProfile")) {
      
      this.email = JSON.parse(sessionStorage.getItem("userProfile")).email;

    } else {

      this.email = null;
      if(sessionStorage.getItem("userType") === "manager")
          this.router.navigate(['homepage-manager/profile']);
        else
          this.router.navigate(['homepage-employee/profile']);
    }
  }

  submit() {

    this.errorMessage = null;

    if(!this.isEmailValid(this.email)) {

      this.errorMessage = "Invalid Email";
      return;
    }

    if(this.email === JSON.parse(sessionStorage.getItem("userProfile")).email) {

      this.errorMessage = "Cannot change to your current email";
      return;
    }

    if(!this.isPasswordValid(this.password)) {

      this.errorMessage = "Invalid Password";
      return;
    }

    this.empService.updateEmail(this.email, this.password, (result) => {

        console.log('yay');

        let userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
        userProfile.email = this.email;
        sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
        
        // window.location.reload();
        if(sessionStorage.getItem("userType") === "manager")
          this.router.navigate(['homepage-manager/profile']);
        else
          this.router.navigate(['homepage-employee/profile']);
      }, (error) => {
        switch(error.error) {
        case "missing email":
          this.errorMessage = "Please enter a new email address";
          break;
        case "invalid email":
          this.errorMessage = "Invalid Email Address";
          break;
        case "email taken":
          this.errorMessage = "Email Address Taken";
          break;
        case "missing password":
          this.errorMessage = "Please enter your password";
          break;
        case "incorrect password":
          this.errorMessage = "Incorrect password";
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

  isEmailValid(email: string) {

    email = email.toLowerCase();

    let result = email.match(`^[a-z0-9]+((\\-|\\.|_)?([a-z0-9]|\\d))*@[a-z0-9]+\\.[a-z0-9]+$`)

    return Boolean(result && result.indexOf(email) > -1);
  }

  isPending() {
    return Boolean(sessionStorage.getItem("pending"));
  }
}
