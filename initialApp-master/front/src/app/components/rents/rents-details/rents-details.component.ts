import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/serv/service.service';
import { ServiceModule } from '../../../models/service.model';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ReviewModel } from '../../../models/review.model';
import { RentService } from '../../../services/rent/rent.service';
import { UsersService } from '../../../services/users/users.service';
import decode from 'jwt-decode';

@Component({
  selector: 'app-rents-details',
  templateUrl: './rents-details.component.html',
  styleUrls: ['./rents-details.component.css']
})
export class RentsDetailsComponent implements OnInit {

  vehicle:any
  id:any
  images: any = []

  constructor(private rentService: RentService, private route: ActivatedRoute, private router: Router, private userService: UsersService) { 

    if(!this.isAuthorized()) {
      this.userService.getUserClaims().subscribe(claims => {
        this.userService.getUserData(claims['Email']).subscribe(user => {
          if(user['Activated'] == false) {
            this.router.navigateByUrl('/profile');
          }
          else {
            if(user['Image'] == "" || user['Image'] == null) {
              this.router.navigateByUrl('/profile');
            }
          }
        })
      })
    }
    
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['Id'];
    });
    this.vehicle = this.rentService.getVehicle(this.id).
    subscribe(data => {
      this.vehicle = data;
      if(this.vehicle['Unavailable']) {
        this.router.navigateByUrl('/home');
      }

      if(this.vehicle.Images != null && this.vehicle.Images != undefined){       
        this.images = this.vehicle.Images.split(';')
      }   
    })
  }

  isAuthorized() {
    const tokenPayload = decode(localStorage.getItem('jwt'));
    if(tokenPayload.role != 'Admin') {
      if(tokenPayload.role != 'Manager') {
        return false;
      }
      else return true;
    }
    else return true;
  }

  // onReserveVehicle(){
  //   this.vehicle.Unavailable = true
  //   this.rentService.setVehicleAvailability(this.id, this.vehicle).
  //   subscribe(data => {
  //     console.log(data)
  //   })
  // }
}
