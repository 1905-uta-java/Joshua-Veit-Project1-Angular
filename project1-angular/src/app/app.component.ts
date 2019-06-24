import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'project1-angular';

  isLoggedIn() {
    return sessionStorage.get("authToken") && sessionStorage.get("userType");
  }

  isManager() {
    return sessionStorage.get("userType") === "manager";
  }

  logout() {
    sessionStorage.clear();
  }
}
