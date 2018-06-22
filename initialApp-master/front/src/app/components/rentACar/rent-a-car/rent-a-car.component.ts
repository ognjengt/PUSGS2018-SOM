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
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
import {PayPalKey} from '../../../../../keys';

@Component({
  selector: 'app-rent-a-car',
  templateUrl: './rent-a-car.component.html',
  styleUrls: ['./rent-a-car.component.css']
})
export class RentACarComponent implements OnInit {

  public payPalConfig?: PayPalConfig;
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
  date1: any;
  date2: any;
  dataLoaded: boolean;

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
      this.dataLoaded = true
      this.vehicle = data;
      this.initConfig()
    })
  }

  onSubmit(rentData: RentModel, form: NgForm) {
    this.date1 = rentData.Start
    this.date2 = rentData.End
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

  private initConfig(): void {
    var date1 = new Date(this.date1);
    var date2 = new Date(this.date2);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
      commit: true,
      client: {
        sandbox: PayPalKey
      },
      button: {
        label: 'paypal',
      },
      onPaymentComplete: (data, actions) => {
        console.log('OnPaymentComplete');
      },
      onCancel: (data, actions) => {
        console.log('OnCancel');
      },
      onError: (err) => {
        console.log('OnError');
      },
      transactions: [{
        amount: {
          currency: 'USD',
          total: this.vehicle.pricePerHour * diffDays * 24
        }
      }]
    });
  }
}
