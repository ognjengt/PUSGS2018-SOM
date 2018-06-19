import { Component, OnInit } from '@angular/core';
import { RentService } from '../../services/rent/rent.service';
import { VehicleModule } from '../../models/vehicle.model';


@Component({
  selector: 'app-rents',
  templateUrl: './rents.component.html',
  styleUrls: ['./rents.component.css'],
  providers: [RentService]
})

export class RentsComponent implements OnInit {

  vehicles : any = []

  constructor(private rentService: RentService) { 
    this.rentService.getVehicles().subscribe(data => {
      this.vehicles = data;
    })
  }

  ngOnInit() {
  }

  deleteVehicle(id, i) {
    this.rentService.deleteVehicle(id).
    subscribe(data => {      
      alert("Delete successful!");
      this.vehicles.splice(i, 1);
    })
  }
}
