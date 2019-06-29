import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ReimbursementRequest } from '../models/ReimbursementRequest';
import { PendingRequestService } from './pending-request.service';

@Injectable({
  providedIn: 'root'
})
export class ReimbursementRequestService {

  url = "http://ec2-18-218-143-173.us-east-2.compute.amazonaws.com:8080/project1/reimbursement";

  constructor(private http: HttpClient, private pendingService: PendingRequestService) { }

  //get

  getUsersRequests(onSuccess: (any) => void, onFailure: (any) => void) {

    this.pendingService.setIsPendingEvent.emit(true);

    let params = new HttpParams()
      .set("authToken", sessionStorage.getItem("authToken"))
      .set("source", "self");
    
    this.http.get<ReimbursementRequest[]>(
      this.url,
      {
        params: params
      }
    ).toPromise()
    .then((result) => {
      this.pendingService.setIsPendingEvent.emit(false);
      onSuccess(result);
    })
    .catch((error) => {
      this.pendingService.setIsPendingEvent.emit(false);
      onFailure(error);
    });
  }

  getSubordinatesRequests(employeeID: number, onSuccess: (any) => void, onFailure: (any) => void) {

    this.pendingService.setIsPendingEvent.emit(true);

    let params = new HttpParams()
      .set("authToken", sessionStorage.getItem("authToken"))
      .set("source", "subordinate")
      .set("employeeID", String(employeeID));
    
    this.http.get<ReimbursementRequest[]>(
      this.url,
      {
        params: params
      }
    ).toPromise()
    .then((result) => {
      this.pendingService.setIsPendingEvent.emit(false);
      onSuccess(result);
    })
    .catch((error) => {
      this.pendingService.setIsPendingEvent.emit(false);
      onFailure(error);
    });
  }

  getAllSubordinatesRequests(onSuccess: (any) => void, onFailure: (any) => void) {

    this.pendingService.setIsPendingEvent.emit(true);

    let params = new HttpParams()
      .set("authToken", sessionStorage.getItem("authToken"))
      .set("source", "subordinates")
    
    this.http.get<ReimbursementRequest[]>(
      this.url,
      {
        params: params
      }
    ).toPromise()
    .then((result) => {
      this.pendingService.setIsPendingEvent.emit(false);
      onSuccess(result);
    })
    .catch((error) => {
      this.pendingService.setIsPendingEvent.emit(false);
      onFailure(error);
    });
  }

  // put

  resolveRequest(requestID: number, approve: boolean, onSuccess: (any) => void, onFailure: (any) => void) {
    
    this.pendingService.setIsPendingEvent.emit(true);
    
    let params = new HttpParams()
      .set("authToken", sessionStorage.getItem("authToken"))
      .set("requestID", String(requestID))
      .set("target", "single")
      .set("approve", String(approve));
      
      this.http.put<any>(
        this.url,
        null,
        {
          headers: new HttpHeaders()
            .set("Content-Type", "application/x-www-form-urlencoded"),
          params: params
        }
      ).toPromise()
      .then((result) => {
        this.pendingService.setIsPendingEvent.emit(false);
        onSuccess(result);
      })
      .catch((error) => {
        this.pendingService.setIsPendingEvent.emit(false);
        onFailure(error);
      });
  }

  resolveRequests(requests: ReimbursementRequest[], onSuccess: (any) => void, onFailure: (any) => void) {
    
    this.pendingService.setIsPendingEvent.emit(true);
    
    let params = new HttpParams()
      .set("authToken", sessionStorage.getItem("authToken"))
      .set("target", "multiple")
      .set("requests", JSON.stringify(requests));
      
      this.http.put<any>(
        this.url,
        null,
        {
          headers: new HttpHeaders()
            .set("Content-Type", "application/x-www-form-urlencoded"),
          params: params
        }
      ).toPromise()
      .then((result) => {
        this.pendingService.setIsPendingEvent.emit(false);
        onSuccess(result);
      })
      .catch((error) => {
        this.pendingService.setIsPendingEvent.emit(false);
        onFailure(error);
      });
  }

  // post

  submitNewRequest(amount: number, onSuccess: (any) => void, onFailure: (any) => void) {
    
    this.pendingService.setIsPendingEvent.emit(true);

    let body = new HttpParams()
      .set("authToken", sessionStorage.getItem("authToken"))
      .set("amount", String(amount));
    
    this.http.post<any>(
        this.url,
        body.toString(),
        {
          headers: new HttpHeaders()
          .set("Content-Type", "application/x-www-form-urlencoded")
        }
      ).toPromise()
      .then((result) => {
        this.pendingService.setIsPendingEvent.emit(false);
        onSuccess(result);
      })
      .catch((error) => {
        this.pendingService.setIsPendingEvent.emit(false);
        onFailure(error);
      });
  }
}