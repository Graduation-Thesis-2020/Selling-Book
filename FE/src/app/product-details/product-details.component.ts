import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
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

  constructor(
    private route: ActivatedRoute,
    private BooksService: BooksService,
    private ReviewService: ReviewsService,
    private AuthorsService: AuthorService,
    private CateService: CateService,
    private cartService: CartService,
    private publisherService: PublisherService
  ) { }

   ngOnInit() {
     this.getBookfromRoute();
     this.getReviewfromIDBook();
     this.getAuthorfromIDBook();
     this.getCatefromIDBook();
     this.getAllPublisher();
     this.getAllBook();
     this.getAllCate();
     this.getAllAuthor();
     this.getAllPub();
     this.getRating();
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
   getBookfromRoute() {
    const id = this.route.snapshot.paramMap.get('id');
    this.BooksService.getBookDetailFromID(id).subscribe(res => this.books = res);

  }
   getRating() {
    const id = this.route.snapshot.paramMap.get('id');
    this.ReviewService.getRatingBook(id).subscribe(res => this.rating = res, error => this.err = error);
  }
   getReviewfromIDBook() {
    const id = this.route.snapshot.paramMap.get('id');
    this.ReviewService.getReviewFromIDBook(id).subscribe(res => this.reviews = res);

  }

  save( comment: string) {
    const bookId = this.route.snapshot.paramMap.get('id');
    const review = this.currentRate;
    const newReview: Review = { review, comment, bookId } as Review;
    this.ReviewService.addReview(newReview).subscribe(res => this.addreivew = res);
    this.getReviewfromIDBook();
  }
   getAuthorfromIDBook() {
    const id = this.route.snapshot.paramMap.get('id');
    this.AuthorsService.getAuthorFromIDBook(id).subscribe(res => this.author = res);
  }
   getCatefromIDBook() {
    const id = this.route.snapshot.paramMap.get('id');
    this.CateService.getCateFromID(id).subscribe(res => this.cates = res);

  }
   getAllPublisher() {
    this.publisherService.getPublishers().subscribe(res => this.pub = res);

  }
  add(id:string) {
    // const id = this.route.snapshot.paramMap.get('id');
    // this.cartService.AddtoCart(id).subscribe(res => this.mess = res);
    this.route.params.subscribe((params) => {
      if (id) {
        this.BooksService.getBooksFromID(id).subscribe(
          (result) => {
            const item: Item = {
              product: result,
              total: 1,
            };
            if (localStorage.getItem('cart') == null) {
              let cart: any = [];
              cart.push(JSON.stringify(item));
              localStorage.setItem('cart', JSON.stringify(cart));
            } else {
              let cart: any = JSON.parse(localStorage.getItem("cart"));
              let index: number = -1;
              for (var i = 0; i < cart.length; i++) {
                let item: Item = JSON.parse(cart[i]);
                if (item.product._id == id) {
                  index = i;
                  break;
                }
              }
              if (index == -1) {
                cart.push(JSON.stringify(item));
                localStorage.setItem("cart", JSON.stringify(cart));
              } else {
                let item: Item = JSON.parse(cart[index]);
                item.total += 1;
                cart[index] = JSON.stringify(item);
                localStorage.setItem("cart", JSON.stringify(cart));
              }
            }
            alert('Thêm Thành Công');
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
      }
    });
  }
  AddtoCart(id:string) {
    // const id = this.route.snapshot.paramMap.get('id');
    // this.cartService.AddtoCart(id).subscribe(res => this.mess = res);
    this.route.params.subscribe((params) => {
      if (id) {
        this.BooksService.getBooksFromID(id).subscribe(
          (result) => {
            const item: Item = {
              product: result,
              total: 1,
            };
            if (localStorage.getItem('cart') == null) {
              let cart: any = [];
              cart.push(JSON.stringify(item));
              localStorage.setItem('cart', JSON.stringify(cart));
            } else {
              let cart: any = JSON.parse(localStorage.getItem("cart"));
              let index: number = -1;
              for (var i = 0; i < cart.length; i++) {
                let item: Item = JSON.parse(cart[i]);
                if (item.product._id == id) {
                  index = i;
                  break;
                }
              }
              if (index == -1) {
                cart.push(JSON.stringify(item));
                localStorage.setItem("cart", JSON.stringify(cart));
              } else {
                let item: Item = JSON.parse(cart[index]);
                item.total += 1;
                cart[index] = JSON.stringify(item);
                localStorage.setItem("cart", JSON.stringify(cart));
              }
            }
            alert('Thêm Thành Công');
            this.loadCart();
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        this.loadCart();
      }
    });
  }
  loadCart() {
    this.total = 0;
    this.items = [];
    let cart: any = JSON.parse(localStorage.getItem("cart"));
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
}
