import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager-home-tab',
  templateUrl: './manager-home-tab.component.html',
  styleUrls: ['./manager-home-tab.component.css']
})
export class ManagerHomeTabComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isPending() {
    return Boolean(sessionStorage.getItem("pending"));
  }
}
