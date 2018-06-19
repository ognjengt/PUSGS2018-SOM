import { Component, OnInit } from '@angular/core';
import { BranchofficeService } from '../../services/branchoffices/branchoffice.service';
import { BranchOfficeModel } from '../../models/branchoffice.model';

@Component({
  selector: 'app-branch-offices',
  templateUrl: './branch-offices.component.html',
  styleUrls: ['./branch-offices.component.css'],
  providers: [BranchofficeService]
})
export class BranchOfficesComponent implements OnInit {

  branchOffices: BranchOfficeModel[] = [];
  
  constructor(private branchOfficeService: BranchofficeService) { 
    this.branchOfficeService.getAllBranchOffices().subscribe(data => {
      this.branchOffices = data;
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

}
