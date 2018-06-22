import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Body } from '@angular/http/src/body';
import { VehicleModule } from '../../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})

export class RentService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  getVehicles(){
    return this.httpClient.get('https://localhost:44347/api/Vehicles/GetVehicles')   
  }

  getVehicle(id){
    return this.httpClient.get('https://localhost:44347/api/Vehicles/GetVehicle?id=' + id)
  }

  addVehicle(addVehicleData: VehicleModule){
    return this.httpClient.post("https://localhost:44347/api/Vehicles/PostVehicle", addVehicleData)
  }

  deleteVehicle(id){
    return this.httpClient.delete("https://localhost:44347/api/Vehicles/DeleteVehicle?id=" + id)
  }

  editVehicle(id, vehicleModule: VehicleModule){
    return this.httpClient.put("https://localhost:44347/api/Vehicles/PutVehicle?id=" + id, vehicleModule)
  }

  setVehicleAvailability(id, vehicleModule: VehicleModule){
    return this.httpClient.put("https://localhost:44347/api/Vehicles/PutVehicleAvailability?id=" + id, vehicleModule)
  }

  getVehicleTypes() {
    return this.httpClient.get("https://localhost:44347/api/Types/GetTypes");
  }

  postNewRent(newRent) {
    return this.httpClient.post("https://localhost:44347/api/Rents/PostRent", newRent)
  }
}
