import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PendingRequestService } from 'src/app/services/pending-request.service';

@Component({
  selector: 'app-homepage-employee',
  templateUrl: './homepage-employee.component.html',
  styleUrls: ['./homepage-employee.component.css']
})
export class HomepageEmployeeComponent implements OnInit {

  isPending: boolean = false;

  constructor(private router: Router, private pendingService: PendingRequestService) { }

  ngOnInit() {
    console.log("employee homepage component init");
    
    if(!sessionStorage.getItem("userType") || sessionStorage.getItem("userType") !== "employee"){
      this.router.navigate(['']);
    }

    if(this.router.url === '')
      this.router.navigate(['employee-home']);
    
    this.pendingService.setIsPendingEvent.subscribe((value: boolean) => {
        setTimeout(() => {
          this.isPending = value
        })
      });
  }
}
