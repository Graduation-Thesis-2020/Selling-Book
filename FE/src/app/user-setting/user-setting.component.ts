import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../service/book.service';
import { Books, Books1 } from '../models/book';
import { ReviewsService } from '../service/review.service';
import { Rating, Review } from '../models/review';
import { AuthorService } from '../service/author.service';
import { Author } from '../models/author';
import { CateService } from '../service/cate.service';
import { Cate } from '../models/cate';
import { CartService } from '../service/cart.service';
import { Item, Mess } from '../models/cart';
import { PublisherService } from '../service/publisher.service';
import { Publisher } from '../models/publisher';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { BookNew } from './../models/book';
import { LoginReturn } from '../models/user';
@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.css']
})
export class UserSettingComponent implements OnInit {
  currentRate:number = 0;
  num = 100;
  books: BookNew;
  bookNew: BookNew;
  review: Review;
  idrv: string;
  reviews: Review[];
  addreivew: Review;
  author: Author;
  cates: Cate[];
  mess: Mess;
  pub: Publisher[];
  pubs: Publisher[];
  auts: Author[];
  books1: Books[];
  cates1: Cate[];
  items: Item[] = [];
  total: number;
  countItem: number;
  rating: Rating;
  err: string;
  username: string;
  isLogin: boolean;
  role: number = null;
  user: LoginReturn;
  constructor(
    private route: ActivatedRoute,
    private BooksService: BooksService,
    private AuthorsService: AuthorService,
    private CateService: CateService,
    private publisherService: PublisherService,
    private router: Router,) { }

  ngOnInit() {
    this.loadUser();
     this.getAllBook();
     this.getAllCate();
     this.getAllAuthor();
     this.getAllPub();
     this.loadCart();
  }
  getAllPub() {
    this.publisherService.getPublishers().subscribe(res => this.pubs = res);
  }
  getAllAuthor() {
    this.AuthorsService.getAuthors().subscribe(res => this.auts = res);
  }
  getAllBook() {
    this.BooksService.getBooks().subscribe(res => this.books1 = res);
  }

  getAllCate() {
    this.CateService.getCates().subscribe(res => this.cates1 = res);
  }

  loadCart() {
    this.total = 0;
    this.items = [];
    let cart: any = JSON.parse(localStorage.getItem("cart"));
    if(cart){
      for (var i = 0; i < cart.length; i++) {
        let item: Item = JSON.parse(cart[i]);
        this.items.push({
          product: item.product,
          total: item.total,
        });
        this.total += item.product.price * item.total;
      }
      this.countItem = this.items.length;
    }
    else{
      this.countItem = 0;
    }

  }
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/login']); // navigate to same route
  });
  }
  loadUser() {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.username = this.user.name;
    this.role = this.user.role;
  }
}
