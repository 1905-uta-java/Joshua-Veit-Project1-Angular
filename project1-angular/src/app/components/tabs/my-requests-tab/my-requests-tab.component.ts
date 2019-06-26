import { Component, OnInit } from '@angular/core';
import { ReimbursementRequest } from 'src/app/models/ReimbursementRequest';
import { ReimbursementRequestService } from 'src/app/services/reimbursement-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-requests-tab',
  templateUrl: './my-requests-tab.component.html',
  styleUrls: ['./my-requests-tab.component.css']
})
export class MyRequestsTabComponent implements OnInit {

  pendingRequests: ReimbursementRequest[];
  resolvedRequests: ReimbursementRequest[];
  showPending: boolean;
  showSubmitNew: boolean;
  newAmount: number;
  errorMessage: string = null;

  constructor(private reqService: ReimbursementRequestService, private router: Router) { }

  ngOnInit() {
    this.showSubmitNew = false;

    this.getRequests();
  }

  getRequests() {

    this.reqService.getUsersRequests((result: ReimbursementRequest[]) => {

      this.pendingRequests = [];
      this.resolvedRequests = [];

      for(let i = 0; i < result.length; i++) {
        if(result[i].managerID === 0)
          this.pendingRequests.push(result[i]);
        else
          this.resolvedRequests.push(result[i]);
      }

    }, (error) => {

      switch(error.error) {
        case "invalid authToken":
          sessionStorage.clear();
          this.router.navigate(['login']);
          break;
        default:
          console.log(error.error);
      }
    });
  }

  isPending() {
    return Boolean(sessionStorage.getItem("pending"));
  }

  submit() {

    this.errorMessage = null;

    if(this.newAmount < 0) {
      this.errorMessage = "Cannot request a negative value";
      return;
    }

    if(this.newAmount === 0) {
      this.errorMessage = "Cannot request $0";
      return;
    }

    this.reqService.submitNewRequest(this.newAmount, (result) => {
      
      this.newAmount = 0;
      this.getRequests();

    }, (error) => {
      
      switch(error.error) {
        case "invalid authToken":
            sessionStorage.clear();
            this.router.navigate(['login']);
            break;
        default:
          console.log(error.error);
      }
    })
  }
}
