import { Component, OnInit } from '@angular/core';
import { BranchofficeService } from '../../../services/branchoffices/branchoffice.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BranchOfficeModel } from '../../../models/branchoffice.model';
import { NgForm } from '@angular/forms';
import { BranchValidations } from '../../../models/validations/validationModels';

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html',
  styleUrls: ['./edit-branch.component.css'],
  providers: [BranchofficeService]
})
export class EditBranchComponent implements OnInit {

  branchOffice: BranchOfficeModel;
  branchOfficeLoaded: boolean;
  id: any;
  validations: BranchValidations = new BranchValidations();

  constructor(private branchOfficeService: BranchofficeService, private route: ActivatedRoute, private router: Router) { 
    
    this.route.params.subscribe((params: Params) => {
      this.id = params['Id'];

      this.branchOfficeService.getBranchOffice(parseInt(this.id)).subscribe(data => {
        this.branchOfficeLoaded = true
        this.branchOffice = data;
  
      })
    });
  }

  ngOnInit() {
    

  }

  onSubmit(editBranchData, form: NgForm) {

    if(this.validations.validateEdit(editBranchData)) return;

    editBranchData.Id = this.branchOffice.Id;
    this.branchOfficeService.editService(this.id, editBranchData).subscribe(resp => {
      console.log(resp);
    })
    console.log(editBranchData);
  }

}
