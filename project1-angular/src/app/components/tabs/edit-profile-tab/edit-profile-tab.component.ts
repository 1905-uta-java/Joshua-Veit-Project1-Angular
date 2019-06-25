import { Component, OnInit, Output } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-edit-profile-tab',
  templateUrl: './edit-profile-tab.component.html',
  styleUrls: ['./edit-profile-tab.component.css']
})
export class EditProfileTabComponent implements OnInit {

  userProfile: Employee;

  constructor(private empService: EmployeeService, private router: Router) { }
  
  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    
    if(sessionStorage.getItem("userProfile")) {
      
      this.userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

    } else {

      this.userProfile = null;
      if(sessionStorage.getItem("userType") === "manager")
          this.router.navigate(['homepage-manager/profile']);
        else
          this.router.navigate(['homepage-employee/profile']);
    }
  }

  submit() {

    this.empService.updateUserProfile(this.userProfile, (result) => {

        console.log('yay');
        sessionStorage.setItem("userProfile", JSON.stringify(this.userProfile));

        // window.location.reload();
        if(sessionStorage.getItem("userType") === "manager")
          this.router.navigate(['homepage-manager/profile']);
        else
          this.router.navigate(['homepage-employee/profile']);

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

  isPending() {
    return Boolean(sessionStorage.getItem("pending"));
  }
}
