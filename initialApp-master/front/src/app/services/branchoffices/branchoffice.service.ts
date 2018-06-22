import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Body } from '@angular/http/src/body';
import { BranchOfficeModel } from '../../models/branchoffice.model';

@Injectable({
  providedIn: 'root'
})
export class BranchofficeService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  private parseData(res: Response) {
    return res.json() || [];
  }

  private handleError(error: Response | any) {
    let errorMessage: string;
    errorMessage = error.message ? error.message : error.toString();
    return Observable.throw(errorMessage);
  }


  getAllServices(): Observable<any> {
    return this.httpClient.get("https://localhost:44347/api/Services/GetServices");
  }

  postBranchOffice(branchOffice): Observable<any> {
    return this.httpClient.post("https://localhost:44347/api/BranchOffices/PostBranchOffice", branchOffice);
  }

  getAllBranchOffices(): Observable<any> {
    return this.httpClient.get("https://localhost:44347/api/BranchOffices/GetBranchOffices");
  }

  deleteBranchOffice(id): Observable<any> {
    return this.httpClient.delete("https://localhost:44347/api/BranchOffices/DeleteBranchOffice?id="+id);
  }

  getBranchOffice(id): Observable<any> {
    return this.httpClient.get("https://localhost:44347/api/BranchOffices/GetBranchOffice?id="+id);
  }

  editService(id, branchOfficeModel){
    return this.httpClient.put("https://localhost:44347/api/BranchOffices/PutBranchOffice?id=" + id, branchOfficeModel)
  }

}