import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Body } from '@angular/http/src/body';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  private parseData(res: Response) {
    return res.json() || [];
  }

  private handleError(error: Response | any) {
    let errorMessage: string;
    errorMessage = error.message ? error.message : error.toString();
    return Observable.throw(errorMessage);
  }


  register(user): Observable<any> {
    console.log(user);
    return this.httpClient.post("http://localhost:51680/api/Account/Register", user);
  }


  login(loginData: any) {

    let headers = new HttpHeaders();
      headers = headers.append('Content-type', 'application/x-www-form-urlencoded');

      console.log(loginData.Username);
      console.log(loginData.Password);

      if(!localStorage.jwt)
      {
         let x = this.httpClient.post('http://localhost:51680/oauth/token',`username=${loginData.Username}&password=${loginData.Password}&grant_type=password`, {"headers": headers}) as Observable<any>
  
        x.subscribe(
          res => {
            console.log(res.access_token);
            
            let jwt = res.access_token;
  
            let jwtData = jwt.split('.')[1]
            let decodedJwtJsonData = window.atob(jwtData)
            let decodedJwtData = JSON.parse(decodedJwtJsonData)
  
            let role = decodedJwtData.role
  
            console.log('jwtData: ' + jwtData)
            console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
            console.log(decodedJwtData)
            console.log('Role ' + role)
  
            localStorage.setItem('jwt', jwt)
            localStorage.setItem('role', role);
          },
          err => {
            console.log("Error occured");
          }
        );
      }
      else
      {
         let x = this.httpClient.get('http://localhost:51680/api/Services') as Observable<any>
  
        x.subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log("Error occured");
          }
        );
      }
}
}
