import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../../services/adminServices/admin-service.service';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {

  unbannedManagers:any = [];

  constructor(adminService: AdminServiceService) { 
    adminService.getUnbannedManagers().subscribe(data => {
      this.unbannedManagers = data;
      console.log(data)
    })
  }

  ngOnInit() {
  }

}
