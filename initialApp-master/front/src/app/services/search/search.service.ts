import { Injectable } from '@angular/core';
import { RentService } from '../rent/rent.service';
import { Observable } from 'rxjs';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Body } from '@angular/http/src/body';
import { VehicleModule } from '../../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private vehicleService: RentService, private httpClient: HttpClient) { }

  getVehicleTypes(): Observable<any> {
    return this.vehicleService.getVehicleTypes();
  }

  search(params): Observable<any> {
    return this.httpClient.post('http://localhost:51680/api/Vehicles/SearchVehicles', params) 
  }
}
