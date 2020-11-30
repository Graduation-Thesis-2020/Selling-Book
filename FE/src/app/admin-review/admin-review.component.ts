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
}
