import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  email: string;
  password: string;

  errorMessage: string;

  closeResult: string;

  constructor(private loginService: LoginService, private empService: EmployeeService) { }

  ngOnInit() {
    console.log("login component");
  }

  submitLogin() {
    console.log(this.email + " " + this.password);

    this.loginService.login(this.email, this.password)
      .then((result) => {

        console.log(`authToken: ${JSON.stringify(result)}`);

        sessionStorage.setItem("authToken", JSON.stringify(result));

        this.getIsManager();

      }).catch((error) => {
        
        console.log(error.error);
      });
  }
  
  getIsManager() {

     this.empService.getSubordinates()
      .then((result) => {

        console.log(`Subordinates ${JSON.stringify(result)}`);

        if(!result || result.length == 0) {
          sessionStorage.setItem("userType", "employee");
        } else {
          sessionStorage.setItem("userType", "manager");
        }
      })
      .catch((error) => {

        console.log(error.error);

        sessionStorage.clear();
      });
  }

  shouldShowLogin() {
    return Boolean(sessionStorage.getItem("authToken"));
  }
}
