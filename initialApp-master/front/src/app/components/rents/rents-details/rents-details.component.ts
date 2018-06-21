import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/serv/service.service';
import { ServiceModule } from '../../../models/service.model';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ReviewModel } from '../../../models/review.model';
import { RentService } from '../../../services/rent/rent.service';

@Component({
  selector: 'app-rents-details',
  templateUrl: './rents-details.component.html',
  styleUrls: ['./rents-details.component.css']
})
export class RentsDetailsComponent implements OnInit {

  vehicle:any
  id:any
  images: any = []

  constructor(private rentService: RentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['Id'];
    });
    this.vehicle = this.rentService.getVehicle(this.id).
    subscribe(data => {
      this.vehicle = data;
      if(this.vehicle.Images != null && this.vehicle.Images != undefined){       
        this.images = this.vehicle.Images.split(';')
      }   
    })
  }

  onReserveVehicle(){
    this.vehicle.Unavailable = true
    this.rentService.setVehicleAvailability(this.id, this.vehicle).
    subscribe(data => {
      console.log(data)
    })
  }
}
