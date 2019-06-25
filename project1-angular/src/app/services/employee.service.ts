import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Employee } from 'src/app/models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url: string = "http://localhost:8080/Project1/employee";

  constructor(private http: HttpClient) { }

  getUserProfile(): Promise<Employee> {
    let params = new HttpParams()
      .set("authToken", sessionStorage.getItem("authToken"))
      .set("source", "self");
    
    return this.http.get<Employee>(
      this.url,
      {
        params: params
      }
    ).toPromise();
  }

  getSubordinates(): Promise<Employee[]> {
    let params = new HttpParams()
      .set("authToken", sessionStorage.getItem("authToken"))
      .set("source", "subordinates");
      
      return this.http.get<Employee[]>(
        this.url,
        {
          params: params
        }
      ).toPromise();
  }
}
