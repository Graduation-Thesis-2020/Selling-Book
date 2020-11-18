import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../service/cart.service';
import { Cart, Item, Mess } from '../models/cart';
import { BooksService } from 'src/app/service/book.service';
import { AuthorService } from '../service/author.service';
import { PublisherService } from '../service/publisher.service';
import { CateService } from './../service/cate.service';
import { Publisher } from '../models/publisher';
import { Author } from '../models/author';
import { Cate } from '../models/cate';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items: Item[] = [];
  total: number;
  countItem: number;
  carts: Cart;
  mess: Mess;
  pubs: Publisher[];
  auts: Author[];
  cates1: Cate[];
  constructor(
    private route: ActivatedRoute,
    private BooksService: BooksService,
    private cartService: CartService,
    private AuthorsService: AuthorService,
    private CateService: CateService,
    private publisherService: PublisherService
  ) {}

  async ngOnInit() {
    this.getAllAuthor();
    this.getAllCate();
    this.getAllPub();
    
    this.route.params.subscribe((params) => {
      const id = params.id;
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

  remove(id: string) {
    let cart: any = JSON.parse(localStorage.getItem("cart"));
    let index: number = -1;
    for (var i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);
      if (item.product._id == id) {
        cart.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.loadCart();
  }

  update(index: number, sign: string) {
    let Input_ = <HTMLInputElement>document.getElementById("Input_" + index);
    let value: number = parseInt(Input_.value);
    if (sign == "minus") {
      value -= 1;
      if (value < 1) {
        Input_.value = "1";
        value = 1;
      } else {
        Input_.value = value.toString();
      }
    } else {
      value += 1;
      Input_.value = value.toString();
    }

    let cart: any = JSON.parse(localStorage.getItem("cart"));
    let item: Item = JSON.parse(cart[index]);
    item.total = value;
    cart[index] = JSON.stringify(item);
    localStorage.setItem("cart", JSON.stringify(cart));

    this.loadCart();
  }
  async AddtoCarts() {
    const id = this.route.snapshot.paramMap.get("id");
    await this.cartService.AddtoCart(id).subscribe((res) => (this.mess = res));
    console.log(this.mess.message);
  }
  async GetCart() {
    await this.cartService
      .getShoppingCart()
      .toPromise()
      .then((res) => (this.carts = res));
    await console.log(this.carts);
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
}
