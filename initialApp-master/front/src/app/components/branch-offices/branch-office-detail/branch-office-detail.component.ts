import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/serv/service.service';
import { ServiceModule } from '../../../models/service.model';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BranchofficeService } from '../../../services/branchoffices/branchoffice.service';

@Component({
  selector: 'app-branch-office-detail',
  templateUrl: './branch-office-detail.component.html',
  styleUrls: ['./branch-office-detail.component.css'],
  providers: [BranchofficeService]
})
export class BranchOfficeDetailComponent implements OnInit {

  branchOffice:any
  id:any

  constructor(private branchOfficeService: BranchofficeService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['Id'];

      this.branchOfficeService.getBranchOffice(parseInt(this.id)).subscribe(data => {
        this.branchOffice = data;
      })
    });
    
  }

}