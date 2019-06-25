import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'project1-angular';

  constructor(private router: Router){}

  ngOnInit() {
    if(!this.isLoggedIn()){
      this.router.navigate(['login']);
    } else if(this.isManager()) {
      this.router.navigate(['homepage-manager']);
    } else {
      this.router.navigate(['homepage-employee']);
    }
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

  isPending() {
    return Boolean(sessionStorage.getItem("pending"));
  }
}
