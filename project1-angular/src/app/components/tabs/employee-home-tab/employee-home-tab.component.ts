import { Component, OnInit } from '@angular/core';
import { PendingRequestService } from 'src/app/services/pending-request.service';

@Component({
  selector: 'app-employee-home-tab',
  templateUrl: './employee-home-tab.component.html',
  styleUrls: ['./employee-home-tab.component.css']
})
export class EmployeeHomeTabComponent implements OnInit {

  isPending: boolean = false;

  constructor(private pendingService: PendingRequestService) { }

  ngOnInit() {
    this.pendingService.setIsPendingEvent.subscribe((value: boolean) => {
        setTimeout(() => {
          this.isPending = value
        })
      });
  }
}
