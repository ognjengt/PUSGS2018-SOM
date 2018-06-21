import { Component, OnInit } from '@angular/core';
import { BranchofficeService } from '../../services/branchoffices/branchoffice.service';
import { BranchOfficeModel } from '../../models/branchoffice.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-branch-offices',
  templateUrl: './branch-offices.component.html',
  styleUrls: ['./branch-offices.component.css'],
  providers: [BranchofficeService]
})
export class BranchOfficesComponent implements OnInit {

  branchOffices: BranchOfficeModel[] = [];
  branchOfficeLoaded: boolean;

  lat: number = 45.0079;
  lng: number = 19.8226;
  markers: any = [];
  
  constructor(private branchOfficeService: BranchofficeService, private router: Router) { 
    this.branchOfficeService.getAllBranchOffices().subscribe(data => {
      this.branchOfficeLoaded = true
      this.branchOffices = data;
      this.branchOffices.forEach(branchoffice => {
        let coords = {
          id: branchoffice.Id,
          lat: branchoffice.Latitude,
          lng: branchoffice.Longitude
        }
        this.markers.push(coords);
      })
    })
  }

  ngOnInit() {
  }

  deletebranchOffice(id, i) {
    this.branchOfficeService.deleteBranchOffice(id).
    subscribe(data => {      
      alert("Delete successful!");
      this.branchOffices.splice(i, 1);
    })
  }

  MarkerClickEvent(marker) {
    this.router.navigateByUrl('/branchOffice/'+marker.id);
  }
}
