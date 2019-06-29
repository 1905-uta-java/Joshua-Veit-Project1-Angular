import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PendingRequestService } from './services/pending-request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'project1-angular';
  isPending: boolean = false;

  constructor(private router: Router, private pendingService: PendingRequestService){}

  ngOnInit() {
    if(!this.isLoggedIn()){
      this.router.navigate(['login']);
    } else if(this.isManager()) {
      this.router.navigate(['homepage-manager']);
    } else {
      this.router.navigate(['homepage-employee']);
    }

    this.pendingService.setIsPendingEvent.subscribe((value: boolean) => {
        setTimeout(() => {
          this.isPending = value
        })
      });
  }

  isLoggedIn() {
    return sessionStorage.getItem("authToken") && sessionStorage.getItem("userType");
  }

  isManager() {
    return sessionStorage.getItem("userType") === "manager";
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
