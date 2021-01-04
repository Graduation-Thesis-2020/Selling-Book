import { Component, OnInit } from '@angular/core';
import { Review, ReviewDetail } from '../models/review';
import { ReviewsService } from '../service/review.service';
import { ReviewChildDetail } from './../models/review';
import {MatSnackBar, MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
@Component({
  selector: 'app-admin-review',
  templateUrl: './admin-review.component.html',
  styleUrls: ['./admin-review.component.css']
})
export class AdminReviewComponent implements OnInit {

  reviews: ReviewDetail[];
  review: Review;
  reviewChild: ReviewDetail;
  reviewChildArray: ReviewChildDetail[];
  config: any;
  id: string;
  idGetOneCmt: string;
  mess: any;
  messError: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private ReviewsService: ReviewsService,private _snackBar: MatSnackBar) {
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
    this.ReviewsService.getReviewDetail().subscribe(res => {this.reviews = res; this.reviews.reverse()});
  }
  getOneReview(id) {
    this.idGetOneCmt= id;
    this.ReviewsService.getReviewFromID(id).subscribe(res =>
      {
        this.reviewChild = res;
        this.reviewChildArray = this.reviewChild.commentChilds;

     });
  }
  del() {
  this.ReviewsService.delete(this.id).subscribe(() => {
        this.getAllReviews();
        this._snackBar.open("Xóa thành công","Đóng", {
          panelClass: "snackbarConfig1",
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }, error => console.error(error));
  }
  delChild(idChild) {
    this.ReviewsService.deleteChild(idChild).subscribe(() => {
          this.getOneReview(this.idGetOneCmt);
        }, error => console.error(error));
    }
  shareId(id){
    this.id= id;
  }
  shareIdforModalCmtChild(id){
    this.idGetOneCmt= id;
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
