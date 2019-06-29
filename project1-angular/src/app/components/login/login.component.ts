import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { PendingRequestService } from 'src/app/services/pending-request.service';

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

  isPending: boolean = false;

  constructor(
    private loginService: LoginService,
    private empService: EmployeeService, 
    private router: Router,
    private pendingService: PendingRequestService) { }

  ngOnInit() {
    console.log("login component init");
    this.pendingService.setIsPendingEvent.subscribe((value: boolean) => {
        setTimeout(() => {
          this.isPending = value
        })
      });
  }

  submitLogin() {
    
    console.log(this.email + " " + this.password);

    this.loginService.login(this.email, this.password,
      (result) => {

        console.log(`authToken: ${JSON.stringify(result)}`);

        sessionStorage.setItem("authToken", JSON.stringify(result));
        this.getIsManager();

      }, (error) => {
        
        console.log(error.error);
      });
  }
  
  getIsManager() {

     this.empService.getSubordinates((result) => {

        console.log(`Subordinates ${JSON.stringify(result)}`);

        if(!result || result.length == 0) {
          sessionStorage.setItem("userType", "employee");
          this.router.navigate(['homepage-employee']);
        } else {
          sessionStorage.setItem("userType", "manager");
          this.router.navigate(['homepage-manager']);
        }
      }, (error) => {
        switch(error.error) {
          case "invalid authToken":
              sessionStorage.clear();
              this.router.navigate(['login']);
              break;
          default:
            console.log("Error Printing" + error.error);
        }
      });
  }
  
  shouldShowLogin() {
    return Boolean(sessionStorage.getItem("authToken"));
  }
}
