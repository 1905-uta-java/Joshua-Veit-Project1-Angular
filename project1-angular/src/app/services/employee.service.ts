import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Employee } from 'src/app/models/employee';
import { PendingRequestService } from './pending-request.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url: string = "http://ec2-18-218-143-173.us-east-2.compute.amazonaws.com:8080/project1/employee";
  
  constructor(private http: HttpClient, private pendingService: PendingRequestService) { }

  getUserProfile(onSuccess: (Employee) => void, onFailure: (any) => void) {
    
    this.pendingService.setIsPendingEvent.emit(true);

    let params = new HttpParams()
      .set("authToken", sessionStorage.getItem("authToken"))
      .set("source", "self");
    
    this.http.get<Employee>(
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
  
  updateUserProfile(editedUserProfile: Employee, onSuccess: (any) => void, onFailure: (any) => void) {
    
    this.pendingService.setIsPendingEvent.emit(true);
    
    let params = new HttpParams()
      .set("authToken", sessionStorage.getItem("authToken"))
      .set("updateType", "data")
      .set("employee", JSON.stringify(editedUserProfile));
      
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
  
  updateEmail(newEmail: string, password: string, onSuccess: (any) => void, onFailure: (any) => void) {
    
    this.pendingService.setIsPendingEvent.emit(true);
    
    let params = new HttpParams()
      .set("authToken", sessionStorage.getItem("authToken"))
      .set("updateType", "email")
      .set("email", newEmail)
      .set("password", password);
      
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
  
  updatePassword(oldPassword, newPassword: string, onSuccess: (any) => void, onFailure: (any) => void) {
    
    this.pendingService.setIsPendingEvent.emit(true);
    
    let params = new HttpParams()
      .set("authToken", sessionStorage.getItem("authToken"))
      .set("updateType", "password")
      .set("oldPassword", oldPassword)
      .set("newPassword", newPassword);
      
      return this.http.put<any>(
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

  getSubordinates(onSuccess: (any) => void, onFailure: (any) => void) {

    this.pendingService.setIsPendingEvent.emit(true);

    let params = new HttpParams()
      .set("authToken", sessionStorage.getItem("authToken"))
      .set("source", "subordinates");
      
      this.http.get<Employee[]>(
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
}