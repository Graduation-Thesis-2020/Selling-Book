import { Component, Input, OnInit } from '@angular/core';
import { Books } from '../models/book';
import { BooksService } from '../service/book.service';
import { CateService } from '../service/cate.service';
import { Cate } from '../models/cate';
import { BookPubComponent } from '../book-pub/book-pub.component';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../service/cart.service';
import { Mess, Cart, Item } from '../models/cart';
import { Publisher } from '../models/publisher';
import { Author } from '../models/author';
import { PublisherService } from '../service/publisher.service';
import { AuthorService } from '../service/author.service';


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
  constructor(private BooksService: BooksService,
              private CateService: CateService, private route: ActivatedRoute, private cartService: CartService,
              private PubService: PublisherService,
              private AuthorService: AuthorService,) { }

  ngOnInit() {
    this.getAllBook();
    this.getAllCate();
    this.getAllAuthor();
    this.getAllPub();
    this.loadCart();
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
  // search(searchTerm: string) {
  //   this.searchbook = undefined;
  //   if (searchTerm) {
  //     this.heroesService
  //       .searchHeroes(searchTerm)
  //       .subscribe(heroes => (this.heroes = heroes));
  //   }
  // }
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
  // async add(id: string){
  //   await this.cartService.AddtoCart(id).toPromise().then(res => this.mess = res);
  //   await console.log(this.mess.message);
  // }
  // GetCart() {
  //   this.cartService.getShoppingCart().subscribe(res => this.carts = res);
  //   console.log(this.carts);
  // }
  search(id: string){
    console.log(id);
    this.BooksService.searchBook(id).subscribe(book => this.books = book);
    //this.BooksService.searchHeroes(id).subscribe(book => this.books = book);
  }
}
