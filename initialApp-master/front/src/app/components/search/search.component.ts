import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import SearchModel from '../../models/search.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(searchData: SearchModel, form: NgForm) {

  }

}
