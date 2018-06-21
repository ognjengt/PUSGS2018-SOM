import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../../services/serv/service.service';
import { ServiceModule } from '../../../models/service.model';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ReviewModel } from '../../../models/review.model';
import { ReviewValidations } from '../../../models/validations/validationModels';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {

  service:any
  id:any
  reviews: ReviewModel[] = [];
  validations: ReviewValidations = new ReviewValidations();

  constructor(private servService: ServiceService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['Id'];
    });
    this.service = this.servService.getService(this.id).
    subscribe(data => {
      this.service = data;
      this.reviews = this.service.Reviews;
    })
  }

  onSubmitReview(review: ReviewModel, form: NgForm) {
    if(this.validations.validate(review)) return;
    if(!this.validations.validateStars(review.Stars)) return;

    review.ServiceId = parseInt(this.id);
    this.servService.postReview(review).subscribe(resp => {
      this.servService.getService(this.id)
      .subscribe( data => {
        this.reviews = data['Reviews'];
      })
    },
    error => {
      alert("Please log in to post a review.")
    })
  }

}
