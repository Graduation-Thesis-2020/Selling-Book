import { Component, OnInit } from '@angular/core';
import { AllOrder, ChangeStatus, Order1, OrderDetail } from '../models/order';
import { OrderService } from './../service/order.service';
import { itemInOrder } from './../models/order';
import { UserService } from './../service/user.service';
import {MatSnackBar, MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {

  orderreturn: AllOrder;
  orders: AllOrder[];
  order: Order1;
  config: any;
  orderDetail: OrderDetail;
  books: itemInOrder[];
  total: number;
  name: string;
  status: string;
  currentStatus: string;
  id: string;
  mess: any;
  messError: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  filterStatus: string ='Tất cả';
  constructor(private orderService: OrderService,private UserService: UserService, private _snackBar: MatSnackBar,) {
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
    this.orderService.getOrders().subscribe(res => {
      this.orders = res;
      this.currentStatus = this.orders[0].status;
      this.orders.reverse();
    });
  }

  detail(id,totalPrice,name,status1){
   this.orderService.getOrdersDetail(id).subscribe(res =>{
    this.id = id
    this.orderDetail = res;
    this.books = this.orderDetail.books;
    this.total= totalPrice;
    this.name = name;
    this.currentStatus = status1;
    console.log(this.currentStatus);

   });
  }
  onItemChange(value) {
    this.status = value;
    console.log(this.status);
  }
  onStatusChange(value){
    this.filterStatus = value;
    console.log(this.filterStatus);
  }
  changeStatus(){
    const status = this.status;
    const Status: ChangeStatus = { status } as ChangeStatus;
    this.orderService.UpdateStatus(this.id,Status).subscribe(res => {
      this.orderreturn = res;
      console.log(this.orderreturn);
      this.getAllOrders();
      this._snackBar.open("Thay đổi thành công!","Đóng", {
        panelClass: "snackbarConfig1",
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    })
  }
  getOd(id: string, name: string){
    this.id = id;
    this.name = name;
  }
  delete(){
    this.orderService.delete(this.id).subscribe(() => {
      this.getAllOrders();
      this._snackBar.open("Xóa thành công!","Đóng", {
        panelClass: "snackbarConfig1",
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }, error => console.error(error));
  }
  search(value){
    const format = 'dd-MM-yyyy';
    const myDate = value;
    const locale = 'en-US';
    const formattedDate = formatDate(myDate, format, locale);
    const day = value;
    this.orderService.orderByDay(formattedDate).subscribe(res=> this.orders = res,
      error => {
      this.mess = error;
      this.messError = this.mess.error.message;
      this.orders.length =0;
      });
      this.messError = null;
  }
  reload(){
    this.messError = null;
    this.getAllOrders();
  }
}
