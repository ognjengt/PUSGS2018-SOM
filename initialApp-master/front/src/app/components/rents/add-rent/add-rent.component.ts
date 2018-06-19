import { Component, OnInit } from '@angular/core';
import { RentService } from '../../../services/rent/rent.service';
import { VehicleModule } from '../../../models/vehicle.model';
import { ServiceModule } from '../../../models/service.model';
import { ServiceService } from '../../../services/serv/service.service';
import { VehicleTypeService } from '../../../services/vehicle-type/vehicle-type.service';


@Component({
  selector: 'app-add-rent',
  templateUrl: './add-rent.component.html',
  styleUrls: ['./add-rent.component.css']
})
export class AddRentComponent implements OnInit {

  services: any = [];
  types: any = []

  constructor(private serviceService: ServiceService, private rentService: RentService, private vehicleTypeService: VehicleTypeService) { 
    serviceService.getServices().subscribe(data => {
      this.services = data;
    })
    vehicleTypeService.getTypes().subscribe(data => {
      this.types = data;
    })
  }

  ngOnInit() {
  }

  onSubmit(vehicleFormData, vehicleForm) {
    console.log(vehicleFormData)
    this.rentService.addVehicle(vehicleFormData).subscribe(response => {
      alert("Vehicle added!");
    })
  }
}
