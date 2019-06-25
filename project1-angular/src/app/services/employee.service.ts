import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Employee } from 'src/app/models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url: string = "http://localhost:8080/Project1/employee";

  constructor(private http: HttpClient) { }

  getUserProfile(onSuccess: (Employee) => void, onFailure: (any) => void) {
    
    sessionStorage.setItem("pending", "true");

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
      sessionStorage.removeItem("pending");
      onSuccess(result);
    })
    .catch((error) => {
      sessionStorage.removeItem("pending");
      onFailure(error);
    });
  }
  
  updateUserProfile(editedUserProfile: Employee, onSuccess: (any) => void, onFailure: (any) => void) {
    
    sessionStorage.setItem("pending", "true");
    
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
        sessionStorage.removeItem("pending");
        onSuccess(result);
      })
      .catch((error) => {
        sessionStorage.removeItem("pending");
        onFailure(error);
      });
  }
  
  updateEmail(newEmail: string, password: string, onSuccess: (any) => void, onFailure: (any) => void) {
    
    sessionStorage.setItem("pending", "true");
    
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
        sessionStorage.removeItem("pending");
        onSuccess(result);
      })
      .catch((error) => {
        sessionStorage.removeItem("pending");
        onFailure(error);
      });
  }
  
  updatePassword(oldPassword, newPassword: string, onSuccess: (any) => void, onFailure: (any) => void) {
    
    sessionStorage.setItem("pending", "true");
    
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
        sessionStorage.removeItem("pending");
        onSuccess(result);
      })
      .catch((error) => {
        sessionStorage.removeItem("pending");
        onFailure(error);
      });
  }

  getSubordinates(onSuccess: (any) => void, onFailure: (any) => void) {
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
        sessionStorage.removeItem("pending");
        onSuccess(result);
      })
      .catch((error) => {
        sessionStorage.removeItem("pending");
        onFailure(error);
      });
  }
}