import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Body } from '@angular/http/src/body';
import PromoteData from '../../models/promoteUser.model';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  private parseData(res: Response) {
    return res.json() || [];
  }

  private handleError(error: Response | any) {
    let errorMessage: string;
    errorMessage = error.message ? error.message : error.toString();
    return Observable.throw(errorMessage);
  }


  getAwaitingServices(): Observable<any> {
    return this.httpClient.get("https://localhost:44347/api/Services/GetAwaitingServices");
  }

  authorizeService(serviceId): Observable<any> {
    return this.httpClient.post("https://localhost:44347/api/Services/AuthorizeService", serviceId);
  }

  getUnbannedManagers(): Observable<any> {
    return this.httpClient.get("https://localhost:44347/api/AdditionalUserOps/GetUnbannedManagers");
  }

  getBannedManagers(): Observable<any> {
    return this.httpClient.get("https://localhost:44347/api/AdditionalUserOps/GetBannedManagers");
  }

  getAwaitingClients(): Observable<any> {
    return this.httpClient.get("https://localhost:44347/api/AdditionalUserOps/GetAwaitingClients");
  }

  authorizeUser(userId): Observable<any> {
    return this.httpClient.post("https://localhost:44347/api/AdditionalUserOps/AuthorizeUser",userId);
  }

  getAllUsers(): Observable<any> {
    return this.httpClient.get("https://localhost:44347/api/AdditionalUserOps/GetAllUsers");
  }

  promoteUser(promotedUser: PromoteData): Observable<any> {
    return this.httpClient.post("https://localhost:44347/api/Account/PromoteUser",promotedUser);
  }

}
