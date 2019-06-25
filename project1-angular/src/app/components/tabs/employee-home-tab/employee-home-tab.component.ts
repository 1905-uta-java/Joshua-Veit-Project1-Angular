import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-home-tab',
  templateUrl: './employee-home-tab.component.html',
  styleUrls: ['./employee-home-tab.component.css']
})
export class EmployeeHomeTabComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isPending() {
    return Boolean(sessionStorage.getItem("pending"));
  }
}
