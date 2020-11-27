import { Component, OnInit } from '@angular/core';
import { Order1, OrderDetail } from '../models/order';
import { OrderService } from './../service/order.service';
import { itemInOrder } from './../models/order';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {

  orders: Order1[];
  order: Order1;
  config: any;
  orderDetail: OrderDetail;
  books: itemInOrder[];
  total: number;
  name: string;
  status: string;

  constructor(private orderService: OrderService) {
    this.config = {
    itemsPerPage: 15,
    currentPage: 1
    };
  }

  pageChanged(event) {
  this.config.currentPage = event;
  }

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getOrders().subscribe(res => this.orders = res);
  }
  delete(title, id) {
    const ans = confirm('Xóa bình luận: ' + title );
    if (ans) {
      this.orderService.delete(id).subscribe(() => {
        this.getAllOrders();
      }, error => console.error(error));
    }
  }
  detail(id,totalPrice,name){
   this.orderService.getOrdersDetail(id).subscribe(res =>{
    this.orderDetail = res;
    this.books = this.orderDetail.books;
    this.total= totalPrice;
    this.name = name;
   });
  }
  onItemChange(value) {
    this.status = value;
  }
  changeStatus(){
    const isChanged = this.status;
    console.log(isChanged);
  }
}
