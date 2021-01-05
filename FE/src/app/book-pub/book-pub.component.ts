import { Component, OnInit } from '@angular/core';
import { Books } from '../models/book';
import { BooksService } from '../service/book.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
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
  selector: 'app-book-pub',
  templateUrl: './book-pub.component.html',
  styleUrls: ['./book-pub.component.css']
})
export class BookPubComponent implements OnInit {
  items: Item[] = [];
  total: number;
  countItem: number;
  books: Books[];
  mySubscription: any;
  pubs: Publisher[];
  auts: Author[];
  cates1: Cate[];
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
                this.router.routeReuseStrategy.shouldReuseRoute = function () {
                  return false;
                };
                this.mySubscription = this.router.events.subscribe((event) => {
                  if (event instanceof NavigationEnd) {
                    // Trick the Router into believing it's last link wasn't previously loaded
                    this.router.navigated = false;
                  }
                });
                this.config = {
                  itemsPerPage: 12,
                  currentPage: 1
                  };
               }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
      }
  }
  async ngOnInit() {
    await this.getAllBookFromPubID();
    await this.getAllCate();
    await this.getAllAuthor();
    await this.getAllPub();
    await this.loadCart();
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

  async getAllBookFromPubID() {
    const id = this.route.snapshot.paramMap.get('id');
    await this.BooksService.getBooksFromPubID(id).toPromise().then(res => this.books = res);
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
            let snackBarRef = this._snackBar.open("Thêm thành công","Xem giỏ hàng", {
              panelClass: "snackbarConfig1",
              duration: 10000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            snackBarRef.onAction().subscribe(()=> this.router.navigate(['/cart']))
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
  search(name1: string){
    this.bookSearch = null;
    this.mess = null;
    const id = this.route.snapshot.paramMap.get('id');
    this.isSearch = true;
    this.BooksService.searchBookWithPub(id,name1).subscribe(book => this.bookSearch = book, error => this.mess = error);
  }
  pageChanged(event) {
    this.config.currentPage = event;
    }
}
