import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.component.html',
  styleUrls: ['./profile-tab.component.css']
})
export class ProfileTabComponent implements OnInit {

  constructor(private empService: EmployeeService, private router: Router) { }

  ngOnInit() {
    console.log("profile tab init");

    this.getUserProfile();
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

  isPending() {
    return Boolean(sessionStorage.getItem("pending"));
  }
}