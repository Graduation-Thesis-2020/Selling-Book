import { Component, OnInit } from '@angular/core';
import { Books } from '../models/book';
import { BooksService } from '../service/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthorService } from '../service/author.service';
import { CateService } from '../service/cate.service';
import { PublisherService } from '../service/publisher.service';
import { Publisher } from '../models/publisher';
import { Author } from '../models/author';
import { Cate } from '../models/cate';
import { Item } from '../models/cart';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
@Component({
  selector: 'app-book-all',
  templateUrl: './book-all.component.html',
  styleUrls: ['./book-all.component.css']
})
export class BookAllComponent implements OnInit {

  books: Books[];
  pubs: Publisher[];
  auts: Author[];
  books1: Books[];
  cates1: Cate[];
  items: Item[] = [];
  total: number;
  countItem: number;
  name: string = this.route.snapshot.paramMap.get('id1');
  isSearch= false;
  config: any;
  bookSearch: Books[];
  mess: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private BooksService: BooksService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private AuthorsService: AuthorService,
              private CateService: CateService,
              private publisherService: PublisherService,
              private _snackBar: MatSnackBar,) {
                this.config = {
                itemsPerPage: 12,
                currentPage: 1
                };}


  ngOnInit() {
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
  getAllCate() {
    this.CateService.getCates().subscribe(res => this.cates1 = res);
  }
  private getAllBook() {
    this.BooksService.getBooks().subscribe(res => this.books =res);
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
            this._snackBar.open("Thêm thành công","Đóng", {
              panelClass: "snackbarConfig1",
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
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
  search(id: string){
    this.bookSearch = null;
    this.mess = null;
    this.isSearch = true;
    this.BooksService.searchBook(id).subscribe(book => this.bookSearch = book);
  }
  pageChanged(event) {
    this.config.currentPage = event;
    }
}
