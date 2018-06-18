import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../services/adminServices/admin-service.service';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {

  unbannedManagers:any = [];
  bannedManagers:any = [];
  awaitingClients:any = [];

  constructor(adminService: AdminServiceService) { 
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

}
