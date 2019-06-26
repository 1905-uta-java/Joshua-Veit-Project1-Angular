import { Component, OnInit } from '@angular/core';
import { ReimbursementRequest } from 'src/app/models/ReimbursementRequest';
import { Router } from '@angular/router';
import { ReimbursementRequestService } from 'src/app/services/reimbursement-request.service';

@Component({
  selector: 'app-employee-requests-tab',
  templateUrl: './employee-requests-tab.component.html',
  styleUrls: ['./employee-requests-tab.component.css']
})
export class EmployeeRequestsTabComponent implements OnInit {

  showPending: boolean;
  pendingRequests: ReimbursementRequest[];
  resolvedRequests: ReimbursementRequest[];

  approvalStagedRequests: ReimbursementRequest[];
  rejectionStagedRequests: ReimbursementRequest[];

  constructor(private router: Router, private reqService: ReimbursementRequestService) { }

  ngOnInit() {
    this.getRequests();
  }

  isPending() {
    return Boolean(sessionStorage.getItem("pending"));
  }

  getRequests() {

    this.pendingRequests = null;
    this.resolvedRequests = null;

    this.approvalStagedRequests = [];
    this.rejectionStagedRequests = [];

    this.reqService.getAllSubordinatesRequests((result) => {

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

  stageForApproval(request: ReimbursementRequest) {

    this.approvalStagedRequests.push(request);

    for(let i  = 0; i < this.rejectionStagedRequests.length; i++) {
      if(request === this.rejectionStagedRequests[i]) {
        this.rejectionStagedRequests.splice(i, 1);
      }
    }
  } 
  
  stageForRejection(request: ReimbursementRequest) {

    this.rejectionStagedRequests.push(request);

    for(let i  = 0; i < this.approvalStagedRequests.length; i++) {
      if(request === this.approvalStagedRequests[i]) {
        this.approvalStagedRequests.splice(i, 1);
      }
    }
  }
  
  confirm() {

    if((!this.approvalStagedRequests || this.approvalStagedRequests.length == 0)
    && (!this.rejectionStagedRequests || this.rejectionStagedRequests.length == 0))
      return;

    let stagedRequests: ReimbursementRequest[] = [];

    for(let approvedRequest of this.approvalStagedRequests) {
      approvedRequest.wasApproved = true;
      stagedRequests.push(approvedRequest);
    }

    for(let rejectedRequest of this.rejectionStagedRequests) {
      rejectedRequest.wasApproved = false;
      stagedRequests.push(rejectedRequest);
    }

    this.reqService.resolveRequests(stagedRequests, (result) => {

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

      this.getRequests();
    })
  }

  isApproved(request: ReimbursementRequest) {

    for(let approvedRequest of this.approvalStagedRequests) {
      if(approvedRequest === request) {
        return true;
      }
    }

    return false;
  }

  isRejected(request: ReimbursementRequest) {

    for(let rejectedRequest of this.rejectionStagedRequests) {
      if(rejectedRequest === request) {
        return true;
      }
    }

    return false;
  }
}
