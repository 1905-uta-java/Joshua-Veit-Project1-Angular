import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'project1-angular';

  isLoggedIn() {
    return sessionStorage.getItem("authToken") && sessionStorage.getItem("userType");
  }

  isManager() {
    return sessionStorage.getItem("userType") === "manager";
  }

  logout() {
    sessionStorage.clear();
  }
}
