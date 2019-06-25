import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage-manager',
  templateUrl: './homepage-manager.component.html',
  styleUrls: ['./homepage-manager.component.css']
})
export class HomepageManagerComponent implements OnInit {

  constructor(private router: Router) { }
  
  ngOnInit() {
    console.log("manager homepage component init");
  }

  isPending() {
    return Boolean(sessionStorage.getItem("pending"));
  }
}