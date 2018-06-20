import { Component, OnInit } from '@angular/core';
import { BranchofficeService } from '../../../services/branchoffices/branchoffice.service';
import { ServiceModule } from '../../../models/service.model';
import { BranchValidations } from '../../../models/validations/validationModels';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css'],
  providers: [BranchofficeService]
})
export class AddBranchComponent implements OnInit {
  
  services: ServiceModule[] = [];
  validations: BranchValidations = new BranchValidations();

  constructor(private branchOfficeService: BranchofficeService) { 
    branchOfficeService.getAllServices().subscribe(data => {
      this.services = data;
    })
  }

  ngOnInit() {
  }

  onSubmit(branchFormData, branchForm) {

    if(this.validations.validate(branchFormData)) return;

    this.branchOfficeService.postBranchOffice(branchFormData).subscribe(response => {
      console.log(response);
    })
  }

}
