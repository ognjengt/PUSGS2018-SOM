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
    return this.httpClient.get('https://localhost:44347/api/Account/UserInfo')
  }

  getUserData(email:string) {
    return this.httpClient.get('https://localhost:44347/api/AdditionalUserOps/GetUser?email='+email)
  }

  getUserImage(email:string) {
    return this.httpClient.get('https://localhost:44347/api/File/GetUserImage?email='+email)
  }

  getUserImages(emails:any) {
    return this.httpClient.post('https://localhost:44347/api/File/PostUserImages',emails)
  }
}
