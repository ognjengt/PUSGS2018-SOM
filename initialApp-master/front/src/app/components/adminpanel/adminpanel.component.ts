import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../services/adminServices/admin-service.service';
import PromoteData from '../../models/promoteUser.model';
import { NgForm } from '@angular/forms';
import { RentService } from '../../services/rent/rent.service';
import { UsersService } from '../../services/users/users.service';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css'],
  providers: [AdminServiceService]
})
export class AdminpanelComponent implements OnInit {

  adminService: AdminServiceService;
  rentService: RentService;
  awaitingServices:any = [];
  unbannedManagers:any = [];
  bannedManagers:any = [];
  awaitingClients:any = [];
  rentedVehicles:any = [];
  userBytesImages:any = [];
  imagesLoaded:boolean = false
  wtfList:any = []

  constructor(adminService: AdminServiceService, rentService: RentService, usersService: UsersService) { 
    this.adminService = adminService;
    this.rentService = rentService;

    adminService.getAwaitingServices().subscribe(data => {
      this.awaitingServices = data;
    })

    adminService.getUnbannedManagers().subscribe(data => {
      this.unbannedManagers = data;
    })

    adminService.getBannedManagers().subscribe(data => {
      this.bannedManagers = data;
    })

    adminService.getAwaitingClients().subscribe(data => {
      this.awaitingClients = data;
      usersService.getUserImages(this.awaitingClients).subscribe(imageBytes => {
        this.userBytesImages = imageBytes
        this.userBytesImages.forEach(element => {
          element = "data:image/png;base64," + element
          this.wtfList.push(element)
        });
        this.imagesLoaded = true
        console.log(this.userBytesImages)
      })
    })

    rentService.getRentedVehicles().subscribe(data => {
      this.rentedVehicles = data;
    })
    
  }

  ngOnInit() {
  }

  rentDue(rent) {
    let today = new Date();
    let endDate = new Date(rent.End);
    if(today >= endDate) {
      return true;
    }
    else return false;
  }

  AuthorizeUser(id, i) {
    this.adminService.authorizeUser(id).subscribe(resp => {
      if(resp == "Ok")  {
        alert("Client has been authorized!"); 
        this.awaitingClients.splice(i,1);
      }

      else alert("Something went wrong");
    })
  }

  AuthorizeService(id, i) {
    this.adminService.authorizeService(id).subscribe(resp => {
      if(resp == "Ok")  {
        alert("Service has been authorized!");
        this.awaitingServices.splice(i,1);
      }

      else alert("Something went wrong");
    })
  }

  PromoteUser(promotedUser: PromoteData, form: NgForm) {
    console.log(promotedUser);

    this.adminService.promoteUser(promotedUser).subscribe(resp => {
      if(resp == "Ok")  {
        alert("User has been promoted to: "+ promotedUser.NewRole);
      }

      else alert("Something went wrong");
    })
  }

  CloseRent(rentId, i) {
    this.rentService.closeRent(rentId).subscribe(resp => {
      if(resp == "Ok") {
        alert("Rent deleted.");
        this.rentedVehicles.splice(i,1);
      }

      else alert("Something went wrong");
    })
  }

}
