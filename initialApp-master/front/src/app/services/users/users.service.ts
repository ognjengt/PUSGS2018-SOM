import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Body } from '@angular/http/src/body';
import { ServiceModule } from '../../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  getUserClaims() {
    return this.httpClient.get('http://localhost:51680/api/Account/UserInfo')
  }

  getUserData(email:string) {
    return this.httpClient.get('http://localhost:51680/api/AdditionalUserOps/GetUser?email='+email)
  }
}
