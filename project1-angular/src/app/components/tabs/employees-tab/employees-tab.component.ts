import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { ReimbursementRequestService } from 'src/app/services/reimbursement-request.service';
import { Router } from '@angular/router';
import { ReimbursementRequest } from 'src/app/models/ReimbursementRequest';
import { PendingRequestService } from 'src/app/services/pending-request.service';

@Component({
  selector: 'app-employees-tab',
  templateUrl: './employees-tab.component.html',
  styleUrls: ['./employees-tab.component.css']
})
export class EmployeesTabComponent implements OnInit {

  employees: Employee[];

  showPending: boolean;
  pendingRequests: ReimbursementRequest[];
  resolvedRequests: ReimbursementRequest[];

  approvalStagedRequests: ReimbursementRequest[];
  rejectionStagedRequests: ReimbursementRequest[];

  selectedEmployee: Employee;

  isPending: boolean = false;

  constructor(
    private router: Router,
    private empService: EmployeeService,
    private reqService: ReimbursementRequestService,
    private pendingService: PendingRequestService) { }

  ngOnInit() {
    this.pendingService.setIsPendingEvent.subscribe((value: boolean) => {
        setTimeout(() => {
          this.isPending = value
        })
      });

    this.getSubordinates();
  }

  getSubordinates() {

    this.employees = null;

    this.empService.getSubordinates((result) => {

      this.employees = result;
      
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

  selectEmployee(employee: Employee) {
    
    this.pendingRequests = null;
    this.resolvedRequests = null;
    this.approvalStagedRequests = [];
    this.rejectionStagedRequests = [];
    this.selectedEmployee = employee;

    if(this.selectEmployee == null)
      return;

    this.reqService.getSubordinatesRequests(employee.employeeID, (result) => {

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

      this.selectEmployee(this.selectedEmployee);

    }, (error) => {
      switch(error.error) {
        case "invalid authToken":
          sessionStorage.clear();
          this.router.navigate(['login']);
          break;
        default:
          console.log(error.error);
      }

      this.selectEmployee(this.selectedEmployee);
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
