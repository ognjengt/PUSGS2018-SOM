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
    return this.httpClient.post("https://localhost:44347/api/Account/Register", user);
  }


  login(loginData: any) {

      let headers = new HttpHeaders();
      headers = headers.append('Content-type', 'application/x-www-form-urlencoded');

      console.log(loginData.Email);
      console.log(loginData.Password);

      if(!localStorage.jwt)
      {
         return this.httpClient.post('https://localhost:44347/oauth/token',`username=${loginData.Email}&password=${loginData.Password}&grant_type=password`, {"headers": headers}) as Observable<any>
      }
      else
      {
         window.location.href = "/home";
      }
}
}
