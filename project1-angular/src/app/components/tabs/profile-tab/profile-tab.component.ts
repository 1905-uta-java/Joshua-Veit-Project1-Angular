import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { PendingRequestService } from 'src/app/services/pending-request.service';

@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.component.html',
  styleUrls: ['./profile-tab.component.css']
})
export class ProfileTabComponent implements OnInit {

  isPending: boolean = false;

  constructor(
    private empService: EmployeeService,
    private router: Router,
    private pendingService: PendingRequestService
    ) { }

  ngOnInit() {

    this.pendingService.setIsPendingEvent.subscribe((value: boolean) => {
        setTimeout(() => {
          this.isPending = value
        })
      });

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
}