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
  images: any = {}
  pages: number;
  pagesArr: number[] = [];
  pagedRequest: SearchModel;

  constructor(private serachService: SearchService) { 
    serachService.getVehicleTypes().subscribe(types => {
      this.types = types;
    })
  }

  ngOnInit() {
  }

  onSubmit(searchData: SearchModel, form: NgForm) {
    searchData.Page = 1;
    this.pagedRequest = searchData;
    console.log(searchData);
    this.serachService.search(searchData).subscribe(data => {
      this.vehicles = data['Vehicles'];
      this.pages = data['Pages'];
      this.pagesArr = [];

      for (let index = 1; index <= this.pages; index++) {
        this.pagesArr.push(index);
      }

      for(let vehicle of this.vehicles){
        if(vehicle['Images'] != null && vehicle['Images'] != undefined){
          var imgsSplit = vehicle['Images'].split(';')
          this.images[vehicle.Id] = imgsSplit
        }        
      }
    })
  }

  Paginate(page) {
    this.pagedRequest.Page = page;

    this.serachService.search(this.pagedRequest).subscribe(data => {
      this.vehicles = data['Vehicles'];
      this.pages = data['Pages'];
      this.pagesArr = [];

      for (let index = 1; index <= this.pages; index++) {
        
        this.pagesArr.push(index);
      }

      for(let vehicle of this.vehicles){
        if(vehicle['Images'] != null && vehicle['Images'] != undefined){
          var imgsSplit = vehicle['Images'].split(';')
          this.images[vehicle.Id] = imgsSplit
        }        
      }
    })
  }

}
