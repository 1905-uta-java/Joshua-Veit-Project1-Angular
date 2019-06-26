import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ReimbursementRequest } from '../models/ReimbursementRequest';

@Injectable({
  providedIn: 'root'
})
export class ReimbursementRequestService {

  url = "http://localhost:8080/Project1/reimbursement";

  constructor(private http: HttpClient) { }

  //get

  getUsersRequests(onSuccess: (any) => void, onFailure: (any) => void) {

    sessionStorage.setItem("pending", "true");

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
      sessionStorage.removeItem("pending");
      onSuccess(result);
    })
    .catch((error) => {
      sessionStorage.removeItem("pending");
      onFailure(error);
    });
  }

  getSubordinatesRequests(employeeID: number, onSuccess: (any) => void, onFailure: (any) => void) {

    sessionStorage.setItem("pending", "true");

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
      sessionStorage.removeItem("pending");
      onSuccess(result);
    })
    .catch((error) => {
      sessionStorage.removeItem("pending");
      onFailure(error);
    });
  }

  getAllSubordinatesRequests(onSuccess: (any) => void, onFailure: (any) => void) {

    sessionStorage.setItem("pending", "true");

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
      sessionStorage.removeItem("pending");
      onSuccess(result);
    })
    .catch((error) => {
      sessionStorage.removeItem("pending");
      onFailure(error);
    });
  }

  // put

  resolveRequest(requestID: number, approve: boolean, onSuccess: (any) => void, onFailure: (any) => void) {
    
    sessionStorage.setItem("pending", "true");
    
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
        sessionStorage.removeItem("pending");
        onSuccess(result);
      })
      .catch((error) => {
        sessionStorage.removeItem("pending");
        onFailure(error);
      });
  }

  resolveRequests(requests: ReimbursementRequest[], onSuccess: (any) => void, onFailure: (any) => void) {
    
    sessionStorage.setItem("pending", "true");
    
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
        sessionStorage.removeItem("pending");
        onSuccess(result);
      })
      .catch((error) => {
        sessionStorage.removeItem("pending");
        onFailure(error);
      });
  }

  // post

  submitNewRequest(amount: number, onSuccess: (any) => void, onFailure: (any) => void) {
    
    sessionStorage.setItem("pending", "true");

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
        sessionStorage.removeItem("pending");
        onSuccess(result);
      })
      .catch((error) => {
        sessionStorage.removeItem("pending");
        onFailure(error);
      });
  }
}