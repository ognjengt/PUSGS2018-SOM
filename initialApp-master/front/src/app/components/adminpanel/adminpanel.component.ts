import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../services/adminServices/admin-service.service';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css'],
  providers: [AdminServiceService]
})
export class AdminpanelComponent implements OnInit {

  adminService: AdminServiceService;
  awaitingServices:any = [];
  unbannedManagers:any = [];
  bannedManagers:any = [];
  awaitingClients:any = [];

  constructor(adminService: AdminServiceService) { 
    this.adminService = adminService;

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
    })
  }

  ngOnInit() {
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

}
