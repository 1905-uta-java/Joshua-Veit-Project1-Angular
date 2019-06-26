import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-homepage-manager',
  templateUrl: './homepage-manager.component.html',
  styleUrls: ['./homepage-manager.component.css']
})
export class HomepageManagerComponent implements OnInit {

  constructor(private router: Router, private empService: EmployeeService) { }
  
  ngOnInit() {
    console.log("manager homepage component init");

    this.getUserProfile();
  }

  isPending() {
    return Boolean(sessionStorage.getItem("pending"));
  }

  getUserProfile(){
    
    if(!this.getCachedUserProfile()) {

      this.empService.getUserProfile((result) => {

          sessionStorage.setItem("userProfile", JSON.stringify(result));

        }, (error) => {

          switch(error.error) {
            case "invalid authToken":
                sessionStorage.clear();
                this.router.navigate(['login']);
                break;
            default:
              console.log(error.error);
          }
        });
    }
  }
  
  getCachedUserProfile() {
    return JSON.parse(sessionStorage.getItem("userProfile"));
  }
}