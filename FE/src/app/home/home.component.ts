import { Component, Input, OnInit } from '@angular/core';
import { Books } from '../models/book';
import { BooksService } from '../service/book.service';
import { CateService } from '../service/cate.service';
import { Cate } from '../models/cate';
import { BookPubComponent } from '../book-pub/book-pub.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { Mess, Cart, Item } from '../models/cart';
import { Publisher } from '../models/publisher';
import { Author } from '../models/author';
import { PublisherService } from '../service/publisher.service';
import { AuthorService } from '../service/author.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Item[] = [];
  total: number;
  countItem: number;
  books: Books[];
  cates: Cate[];
  searchbook: Books;
  mess: Mess;
  carts: Cart;
  pubs: Publisher[];
  auts: Author[];
  @Input() dataSearch: string;
  bestseller: Books[] =[];
  comingsoon: Books[] = [];
  sale: Books[]= [];
  isSearch = false;
  booksearch: Books[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private BooksService: BooksService,
              private CateService: CateService, private route: ActivatedRoute, private cartService: CartService,
              private PubService: PublisherService,
              private AuthorService: AuthorService,
              private _snackBar: MatSnackBar,private router: Router) { }

  ngOnInit() {
    this.getAllBook();
    this.getAllCate();
    this.getAllAuthor();
    this.getAllPub();
    this.loadCart();
    this.getAllBookBestSeller();
    this.getAllBookComingSoone();
    this.getAllBookSale();
  }

  getAllPub() {
    this.PubService.getPublishers().subscribe(res => this.pubs = res);
  }
  getAllAuthor() {
    this.AuthorService.getAuthors().subscribe(res => this.auts = res);
  }
  getAllBook() {
    this.BooksService.getBooks().subscribe(book => this.books = book);
  }
  getAllCate() {
    this.CateService.getCates().subscribe(res => this.cates = res);
  }
  getAllBookBestSeller() {
    this.BooksService.getBooksBestSeller().subscribe(res => this.bestseller = res);
  }
  getAllBookComingSoone() {
    this.BooksService.getBooksComingSoon().subscribe(res => this.comingsoon = res);
  }
  getAllBookSale() {
    this.BooksService.getBooksSale().subscribe(res => this.sale = res);
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
            let snackBarRef =  this._snackBar.open("Thêm thành công","Xem giỏ hàng", {
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

  search(id: string){
    console.log(id);
    this.booksearch = null;
    this.isSearch = true;
    this.BooksService.searchBook(id).subscribe(book => this.booksearch = book);
    console.log(this.books);
  }
}
