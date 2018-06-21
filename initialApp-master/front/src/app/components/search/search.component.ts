import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import SearchModel from '../../models/search.model';
import { SearchService } from '../../services/search/search.service';
import { TypeModule } from '../../models/type.model';
import { VehicleModule } from '../../models/vehicle.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  types: TypeModule[] = [];
  vehicles: VehicleModule[] = [];

  constructor(private serachService: SearchService) { 
    serachService.getVehicleTypes().subscribe(types => {
      this.types = types;
    })
  }

  ngOnInit() {
  }

  onSubmit(searchData: SearchModel, form: NgForm) {
    this.serachService.search(searchData).subscribe(data => {
      this.vehicles = data;
      console.log(this.vehicles);
    })
  }

}
