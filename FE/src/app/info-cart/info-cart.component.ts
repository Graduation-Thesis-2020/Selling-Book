import { Component, OnInit } from '@angular/core';
import { Item } from '../models/cart';
import { Order } from './../models/order';
import { OrderService } from './../service/order.service';

@Component({
  selector: 'app-info-cart',
  templateUrl: './info-cart.component.html',
  styleUrls: ['./info-cart.component.css']
})
export class InfoCartComponent implements OnInit {
  items: Item[] = [];
  total: number;
  countItem: number;
  order: Order;
  constructor(private orderService: OrderService,) { }

  ngOnInit() {
    this.loadCart();
  }

  save(  email: string, phone: string, address: string, name: string) {
    const cart = this.items;
    const newOrder: Order = { email , cart, phone, address, name} as Order;
    console.log(newOrder);
    this.orderService.addOrder(newOrder).subscribe(res => this.order = res);
    // alert('Thêm Thành Công!');
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
