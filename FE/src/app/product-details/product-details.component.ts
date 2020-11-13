import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../service/book.service';
import { Books, Books1 } from '../models/book';
import { ReviewsService } from '../service/review.service';
import { Review } from '../models/review';
import { AuthorService } from '../service/author.service';
import { Author } from '../models/author';
import { CateService } from '../service/cate.service';
import { Cate } from '../models/cate';
import { CartService } from '../service/cart.service';
import { Item, Mess } from '../models/cart';
import { PublisherService } from '../service/publisher.service';
import { Publisher } from '../models/publisher';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  books: Books;
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
  constructor(
    private route: ActivatedRoute,
    private BooksService: BooksService,
    private ReviewService: ReviewsService,
    private AuthorsService: AuthorService,
    private CateService: CateService,
    private cartService: CartService,
    private publisherService: PublisherService
  ) { }

  async ngOnInit() {
    await this.getBookfromRoute();
    await this.getReviewfromIDBook();
    await this.getAuthorfromIDBook();
    await this.getCatefromIDBook();
    await this.getAllPublisher();
    await this.getAllBook();
    await this.getAllCate();
    await this.getAllAuthor();
    await this.getAllPub();
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
  async getBookfromRoute() {
    const id = this.route.snapshot.paramMap.get('id');
    await this.BooksService.getBooksFromID(id).toPromise().then(res => this.books = res);

  }
  // getReviewfromID(id: string) {
  //   const idrv = this.books.reviews;
  //   this.ReviewService.getReviewFromID(id).subscribe(res => this.review = res);
  //   console.log(this.review);
  // }
  async getReviewfromIDBook() {
    const id = this.route.snapshot.paramMap.get('id');
    await this.ReviewService.getReviewFromIDBook(id).toPromise().then(res => this.reviews = res);

  }
  async save(review: number, comment: string) {
    const bookId = this.route.snapshot.paramMap.get('id');
    const newReview: Review = { review, comment, bookId } as Review;
    await this.ReviewService.addReview(newReview).toPromise().then(res => this.addreivew = res);
    await this.getReviewfromIDBook();
  }
  async getAuthorfromIDBook() {
    const id = this.route.snapshot.paramMap.get('id');
    await this.AuthorsService.getAuthorFromIDBook(id).toPromise().then(res => this.author = res);
  }
  async getCatefromIDBook() {
    const id = this.route.snapshot.paramMap.get('id');
    await this.CateService.getCateFromID(id).toPromise().then(res => this.cates = res);

  }
  async getAllPublisher() {
    await this.publisherService.getPublishers().toPromise().then(res => this.pub = res);

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
}
