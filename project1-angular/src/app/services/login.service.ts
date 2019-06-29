import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PendingRequestService } from './pending-request.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = "http://ec2-18-218-143-173.us-east-2.compute.amazonaws.com:8080/project1/login";

  constructor(private http: HttpClient, private pendingService: PendingRequestService) { }
  
  login(email: string, password: string, onSuccess: (any) => void, onFailure: (any) => void) {
    
    this.pendingService.setIsPendingEvent.emit(true);
    
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
        this.pendingService.setIsPendingEvent.emit(false);
        onSuccess(result);
      })
      .catch((error) => {
        this.pendingService.setIsPendingEvent.emit(false);
        onFailure(error);
      });
  }
}
