import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-requests-tab',
  templateUrl: './employee-requests-tab.component.html',
  styleUrls: ['./employee-requests-tab.component.css']
})
export class EmployeeRequestsTabComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isPending() {
    return Boolean(sessionStorage.getItem("pending"));
  }
}
