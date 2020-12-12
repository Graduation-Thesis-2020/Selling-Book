import { Component, OnInit } from '@angular/core';
import { Item, Item2 } from '../models/cart';
import { Order, Order1 } from './../models/order';
import { OrderService } from './../service/order.service';
import { Item1 } from './../models/cart';
import { UserService } from '../service/user.service';
import { BooksService } from 'src/app/service/book.service';
import { AuthorService } from '../service/author.service';
import { PublisherService } from '../service/publisher.service';
import { CateService } from './../service/cate.service';
import { Publisher } from '../models/publisher';
import { Author } from '../models/author';
import { Cate } from '../models/cate';
import { Profile } from './../models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-info-cart',
  templateUrl: './info-cart.component.html',
  styleUrls: ['./info-cart.component.css']
})
export class InfoCartComponent implements OnInit {
  items: Item[] = [];
  items2: Item2[] = [];
  total: number;
  countItem: number;
  order: Order1;
  pubs: Publisher[];
  auts: Author[];
  cates1: Cate[];
  profile: Profile;
  infoForm: FormGroup;

  constructor(private orderService: OrderService,
    private BooksService: BooksService,
    private UserService: UserService,
    private AuthorsService: AuthorService,
    private CateService: CateService,
    private publisherService: PublisherService,
    private route: Router) { }

  ngOnInit() {
    this.loadCart();
    this.getAllAuthor();
    this.getAllCate();
    this.getAllPub();
    this.loadProfile();
    this.infoForm = new FormGroup({
      name: new FormControl(this.profile.name, [
        Validators.required,
        Validators.minLength(4)
      ]),
      phone: new FormControl(this.profile.phone,[
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('[0-9]*')]),
      address: new FormControl(this.profile.address, Validators.required)
    })
  }

  get name() { return this.infoForm.get('name'); }
  get phone() { return this.infoForm.get('phone'); }
  get address() { return this.infoForm.get('address'); }
  getAllPub() {
    this.publisherService.getPublishers().subscribe(res => this.pubs = res);
  }
  getAllAuthor() {
    this.AuthorsService.getAuthors().subscribe(res => this.auts = res);
  }
  getAllCate() {
    this.CateService.getCates().subscribe(res => this.cates1 = res);
  }
  save(  email: string, phone: string, address: string, name: string) {
    const books = this.items2;
    const total = this.total;
    const newOrder: Order1 = { email , books, phone, address, name, total} as Order1;
    console.log(newOrder);
    this.orderService.addOrder(newOrder).subscribe(res => this.order = res);
    // alert('Thêm Thành Công!');
  }
  confirm(){
    console.log(this.profile);
    const token = (localStorage.getItem("token"));
    this.UserService.FilloutProfile(this.profile,token).subscribe();
    this.route.navigate(['/checkout']);
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
  loadProfile(){
    const token = localStorage.getItem("token");
    this.UserService.getProfile(token).subscribe(user => {this.profile = user, console.log(this.profile)});
  }
}
