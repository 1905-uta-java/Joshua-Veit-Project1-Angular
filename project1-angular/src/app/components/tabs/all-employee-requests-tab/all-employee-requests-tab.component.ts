import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-employee-requests-tab',
  templateUrl: './all-employee-requests-tab.component.html',
  styleUrls: ['./all-employee-requests-tab.component.css']
})
export class AllEmployeeRequestsTabComponent implements OnInit {
  
  constructor(private router: Router) { }

  ngOnInit() {
    
    if(!sessionStorage.getItem("userType") || sessionStorage.getItem("userType") !== "manager"){
      this.router.navigate(['']);
    }
  }

  isPending() {
    return Boolean(sessionStorage.getItem("pending"));
  }
}
