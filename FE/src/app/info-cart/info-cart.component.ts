import { Component, OnInit } from '@angular/core';
import { Item, Item2 } from '../models/cart';
import { Order, Order1 } from './../models/order';
import { OrderService } from './../service/order.service';
import { Item1 } from './../models/cart';

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
  constructor(private orderService: OrderService,) { }

  ngOnInit() {
    this.loadCart();
  }

  save(  email: string, phone: string, address: string, name: string) {
    const books = this.items2;
    const total = this.total;
    const newOrder: Order1 = { email , books, phone, address, name, total} as Order1;
    console.log(newOrder);
    this.orderService.addOrder(newOrder).subscribe(res => this.order = res);
    // alert('Thêm Thành Công!');
  }

  loadCart() {
    this.total = 0;
    this.items2 = [];
    const cart: any = JSON.parse(localStorage.getItem('cart'));
    for (var i = 0; i < cart.length; i++) {
      let item: Item = JSON.parse(cart[i]);
      this.items2.push({
        _id: item.product._id,
        title: item.product.title,
        price: item.product.price,
        total: item.total,
      });
      this.total += item.product.price * item.total;
    }
    this.countItem = this.items.length;
  }
}
