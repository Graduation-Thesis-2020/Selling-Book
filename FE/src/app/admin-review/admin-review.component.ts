import { Component, OnInit } from '@angular/core';
import { Review, ReviewDetail } from '../models/review';
import { ReviewsService } from '../service/review.service';

@Component({
  selector: 'app-admin-review',
  templateUrl: './admin-review.component.html',
  styleUrls: ['./admin-review.component.css']
})
export class AdminReviewComponent implements OnInit {

  reviews: ReviewDetail[];
  review: Review;
  config: any;
  id: string;
  mess: any;
  messError: string;
  constructor(private ReviewsService: ReviewsService) {
    this.config = {
    itemsPerPage: 15,
    currentPage: 1
    };
  }

  pageChanged(event) {
  this.config.currentPage = event;
  }

  ngOnInit() {
    this.getAllReviews();
  }

  getAllReviews() {
    this.ReviewsService.getReviewDetail().subscribe(res => this.reviews = res);
  }
  delete(title, id) {
    const ans = confirm('Xóa bình luận: ' + title );
    if (ans) {
      this.ReviewsService.delete(id).subscribe(() => {
        this.getAllReviews();
      }, error => console.error(error));
    }
  }
  del() {
  this.ReviewsService.delete(this.id).subscribe(() => {
        this.getAllReviews();
      }, error => console.error(error));
    }
  shareId(id){
    this.id= id;
  }
  search(t: string){
    this.ReviewsService.searchReviewAdmin(t).subscribe(res => {this.reviews = res; console.log(this.reviews);
    },
      error => {
        this.mess = error;
        console.log(this.mess);
        this.messError = this.mess.error.message;
        this.reviews.length = 0;
    });
    this.messError = null;
  }
  reload(){
    this.messError = null;
    this.getAllReviews();
  }
}
