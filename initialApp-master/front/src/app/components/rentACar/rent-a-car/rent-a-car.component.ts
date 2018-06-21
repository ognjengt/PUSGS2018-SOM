import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/serv/service.service';
import { ServiceModule } from '../../../models/service.model';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ReviewModel } from '../../../models/review.model';
import { RentService } from '../../../services/rent/rent.service';
import RentModel from '../../../models/rent.model';
import { BranchofficeService } from '../../../services/branchoffices/branchoffice.service';
import { BranchOfficeModel } from '../../../models/branchoffice.model';

@Component({
  selector: 'app-rent-a-car',
  templateUrl: './rent-a-car.component.html',
  styleUrls: ['./rent-a-car.component.css']
})
export class RentACarComponent implements OnInit {

  vehicle:any
  id:any
  branchOffices: BranchOfficeModel[] = [];
  lat: number = 45.0079;
  lng: number = 19.8226;
  markers: any[] = [];
  selectedBranchOffice: any = {
    id: null,
    name: ""
  }

  constructor(private rentService: RentService, private route: ActivatedRoute, private router: Router, private branchOfficeService: BranchofficeService) {
    this.branchOfficeService.getAllBranchOffices().subscribe(data => {
      this.branchOffices = data;
      this.branchOffices.forEach(branchoffice => {
        let coords = {
          branchName: branchoffice.Name,
          id: branchoffice.Id,
          lat: branchoffice.Latitude,
          lng: branchoffice.Longitude
        }
        this.markers.push(coords);
      })
    })
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['Id'];
    });
    this.rentService.getVehicle(this.id).
    subscribe(data => {
      this.vehicle = data;
    })
  }

  onSubmit(rentData: RentModel, form: NgForm) {
    rentData.VehicleId = parseInt(this.id);
    rentData.BranchOfficeId = this.selectedBranchOffice.id;
    if (this.selectedBranchOffice.id == null) {
      alert('Select branch office');
      return;
    }
    console.log(rentData);
    this.rentService.postNewRent(rentData).subscribe(resp => {
      if(resp == "Ok") alert("Successfully reserved!");
    },
    error => {
      alert("You are not logged in!");
    })
  }

  SelectBranchOffice(marker) {
    this.selectedBranchOffice = {
      id: marker.id,
      name: marker.branchName
    }
  }
}
