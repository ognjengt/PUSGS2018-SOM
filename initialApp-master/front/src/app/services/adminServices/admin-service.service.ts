import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Body } from '@angular/http/src/body';

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
    return this.httpClient.get("http://localhost:51680/api/Services/ENDPOINT");
  }

  getUnbannedManagers(): Observable<any> {
    return this.httpClient.get("http://localhost:51680/api/AdditionalUserOps/GetUnbannedManagers");
  }

  getBannedManagers(): Observable<any> {
    return this.httpClient.get("http://localhost:51680/api/AdditionalUserOps/GetBannedManagers");
  }

  getAwaitingClients(): Observable<any> {
    return this.httpClient.get("http://localhost:51680/api/AdditionalUserOps/GetAwaitingClients");
  }

  authorizeUser(id): Observable<any> {
    return this.httpClient.post("http://localhost:51680/api/AdditionalUserOps/AuthorizeUser",id);
  }

}
