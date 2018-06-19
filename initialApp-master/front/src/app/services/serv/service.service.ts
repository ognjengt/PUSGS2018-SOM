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
export class ServiceService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  getServices(){
    return this.httpClient.get('http://localhost:51680/api/Services/GetServices')   
  }

  getService(id){
    return this.httpClient.get('http://localhost:51680/api/Services/GetService?id=' + id)
  }

  addService(addServiceData: ServiceModule){
    return this.httpClient.post("http://localhost:51680/api/Services/AddService", addServiceData)
  }

  deleteService(id){
    return this.httpClient.delete("http://localhost:51680/api/Services/DeleteService?id=" + id)
  }

  editService(id, serviceModule: ServiceModule){
    return this.httpClient.put("http://localhost:51680/api/Services/PutService?id=" + id, serviceModule)
  }

  postReview(review) {
    return this.httpClient.post("http://localhost:51680/api/Services/PostReview", review)
  }
}
