import { Component, OnInit } from '@angular/core';
import { PendingRequestService } from 'src/app/services/pending-request.service';

@Component({
  selector: 'app-manager-home-tab',
  templateUrl: './manager-home-tab.component.html',
  styleUrls: ['./manager-home-tab.component.css']
})
export class ManagerHomeTabComponent implements OnInit {

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
