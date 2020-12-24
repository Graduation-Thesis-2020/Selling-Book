import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { Cart, Item, ItemCheckout, ItemCheckoutWithPay, Mess } from '../models/cart';
import { BooksService } from 'src/app/service/book.service';
import { AuthorService } from '../service/author.service';
import { PublisherService } from '../service/publisher.service';
import { CateService } from './../service/cate.service';
import { Publisher } from '../models/publisher';
import { Author } from '../models/author';
import { Cate } from '../models/cate';
import { UserService } from '../service/user.service';
import { Profile } from './../models/user';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { ItemPaypal } from './../models/cart';
import { BookInCartCheckout } from '../models/book';
declare var paypal;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('paypal', {static: true}) paypalElement: ElementRef;

  product = {
    description: 'The Book Store',
    price: 100,
    quantity: 2
  }
  paidFor = false;

  //paypal
  items: Item[] = [];
  itemsPaypal: ItemPaypal[]=[];
  totalUSD: number;
  total: number;
  countItem: number;
  carts: Cart;
  mess: Mess;
  pubs: Publisher[];
  auts: Author[];
  cates1: Cate[];
  profile: Profile;
  order: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  cartCheckout: ItemCheckout = JSON.parse(localStorage.getItem("cartCheckout"));
  isPaid = false;
  constructor(
    private route: ActivatedRoute,
    private BooksService: BooksService,
    private cartService: CartService,
    private AuthorsService: AuthorService,
    private CateService: CateService,
    private publisherService: PublisherService,
    private UserService: UserService,
    private _snackBar: MatSnackBar,
    private router1: Router
  ) {}

  ngOnInit() {
    paypal.Buttons({
      createOrder: (data,actions) => {
        return actions.order.create({
          intent: 'CAPTURE',
          purchase_units: [
            {

              items: this.itemsPaypal,
              amount: {
                currency_code: 'USD',
                value: this.totalUSD,
                breakdown: {
                    item_total: {
                        currency_code: 'USD',
                        value: this.totalUSD
                    }
                }
            },
              description: this.product.description,
            }
          ]
        });
      },
      onApprove: async (data,actions)=>{
        const order = await actions.order.capture();
        console.log(order);
        this.checkoutPaypal();
        this.paidFor = true;
      },
      onError: err => {
        console.log(err);
      }
    })
    .render(this.paypalElement.nativeElement);
    this.loadCartCheckout();
    this.loadProfile();
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
    if(cart){
      for (var i = 0; i < cart.length; i++) {
        let item: Item = JSON.parse(cart[i]);
        this.items.push({
          product: item.product,
          total: item.total,
        });
        if(item.product.discount ==0){
          this.total += item.product.price * item.total;
        } else {
          this.total += item.product.discount * item.total;
        }
      }
      this.countItem = this.items.length;
    }
    else{
      this.countItem = 0;
    }

  }
  loadCartCheckout() {
    let totalUSD: number = 0;
    const cartCheckout: ItemCheckout = JSON.parse(localStorage.getItem("cartCheckout"));
    const itemCartCheckout = cartCheckout.books;
    if(cartCheckout){
      for (var i = 0; i < cartCheckout.books.length; i++) {
        let itemPaypal: BookInCartCheckout = itemCartCheckout[i];
        this.itemsPaypal.push({
          name: itemPaypal.title,
          quantity: itemPaypal.qty,
          unit_amount:{
            currency_code: 'USD',
            value: Math.round((itemPaypal.price/23000) * 100.0) / 100.0
          }
        });
        totalUSD += (Math.round((itemPaypal.price/23000) * 100.0) / 100.0) * itemPaypal.qty;
      }
      console.log(Math.round((this.total/23000) * 100.0) / 100.0);

      console.log(this.itemsPaypal);

    }
    else{
      this.countItem = 0;
    }
    this.totalUSD = totalUSD

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
  getAllPub() {
    this.publisherService.getPublishers().subscribe(res => this.pubs = res);
  }
  getAllAuthor() {
    this.AuthorsService.getAuthors().subscribe(res => this.auts = res);
  }
  getAllCate() {
    this.CateService.getCates().subscribe(res => this.cates1 = res);
  }
  async loadProfile(){
    const token = localStorage.getItem("token");
    await this.UserService.getProfile(token).subscribe(user => {this.profile = user, console.log(this.profile)});
  }
  checkout(){
    const token = localStorage.getItem("token");
    let cartCheckout: ItemCheckout = JSON.parse(localStorage.getItem("cartCheckout"));
    console.log(token);
    console.log(cartCheckout);
    const isPaid = false;
    const books = cartCheckout.books;
    const totalPrice = cartCheckout.totalPrice;
    const cartCheckoutWithPay: ItemCheckoutWithPay = {books, totalPrice, isPaid} as ItemCheckoutWithPay;
    this.UserService.CreateOrder(cartCheckoutWithPay,token).subscribe(
      order => {
        this.order = order;
        console.log(this.order);
        localStorage.removeItem('cart');
        localStorage.removeItem('cartCheckout');
        this._snackBar.open("Đặt hàng thành công","Đóng", {
          panelClass: "snackbarConfig",
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.router1.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router1.navigate(['/setting/order']);  });
      });

  };
  checkoutPaypal(){
    const token = localStorage.getItem("token");
    let cartCheckout: ItemCheckout = JSON.parse(localStorage.getItem("cartCheckout"));
    console.log(token);
    console.log(cartCheckout);
    const isPaid = true;
    const books = cartCheckout.books;
    const totalPrice = cartCheckout.totalPrice;
    const cartCheckoutWithPay: ItemCheckoutWithPay = {books, totalPrice, isPaid} as ItemCheckoutWithPay;
    this.UserService.CreateOrder(cartCheckoutWithPay,token).subscribe(
      order => {
        this.order = order;
        console.log(this.order);
        localStorage.removeItem('cart');
        localStorage.removeItem('cartCheckout');
        this._snackBar.open("Đặt hàng thành công","Đóng", {
          panelClass: "snackbarConfig",
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.router1.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router1.navigate(['/setting/order']);  });
      });

  };

  test(){
    let cartCheckout: ItemCheckout = JSON.parse(localStorage.getItem("cartCheckout"));
    let isPaid = this.isPaid;
    const books = cartCheckout.books;
    const totalPrice = cartCheckout.totalPrice;
    const cartCheckoutWithPay: ItemCheckoutWithPay = {books, totalPrice, isPaid} as ItemCheckoutWithPay;
    console.log(cartCheckoutWithPay);
  }
}
