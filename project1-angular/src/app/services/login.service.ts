import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = "http://localhost:8080/Project1/login";

  constructor(private http: HttpClient) { }
  
  login(email: string, password: string, onSuccess: (any) => void, onFailure: (any) => void) {
    
    sessionStorage.setItem("pending", "true");

    let body = new HttpParams()
      .set("email", email)
      .set("password", password);
    
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
