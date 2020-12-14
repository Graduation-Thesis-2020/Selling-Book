import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/service/book.service';
import { Books } from '../models/book';
import { UserService } from './../service/user.service';
import { AllOrder, OrderDetail, itemInOrder, ChangeStatus } from './../models/order';
import { OrderService } from './../service/order.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {
  comingsoon: Books[];
  order: AllOrder[];
  detail: OrderDetail ;
  total: number;
  books: itemInOrder[];
  all: number=0;
  waiting: number = 0;
  taking: number = 0;
  shipping: number=0;
  isShipped: number=0;
  del: number=0;
  od: any;
  id: string;
  config: any;
  config1: any;
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  constructor(private BooksService: BooksService, private UserService: UserService, private orderService: OrderService,
    private _snackBar: MatSnackBar) {
      this.config = {
        itemsPerPage: 3,
        currentPage: 1
        };
        this.config1 = {
          itemsPerPage: 3,
          currentPage: 1
          };
    }

  ngOnInit() {
    this.getAllBookComingSoon();
    this.loadOrder();
  }
  pageChanged(event) {
    this.config.currentPage = event;
    }
    pageChanged1(event) {
      this.config1.currentPage = event;
      }
  getAllBookComingSoon() {
    this.BooksService.getBooksComingSoon().subscribe(res => this.comingsoon = res);
  }
  loadOrder(){
    const token = localStorage.getItem('token');
    this.UserService.GetAllOrder(token).subscribe(order => {
      this.order = order;
      this.all = this.order.length;
      for(var i = 0; i< this.all ; i++){
        if(this.order[i].status=='Chờ xác nhận'){
          this.waiting += 1;
        }
        if(this.order[i].status=='Đang lấy hàng'){
          this.taking += 1;
        }
        if(this.order[i].status=='Đang giao'){
          this.shipping += 1;
        }
        if(this.order[i].status=='Đã giao'){
          this.isShipped += 1;
        }
        if(this.order[i].status=='Hủy'){
          this.del += 1;
        }
      }
    })
  }
  getDetail(id, totalPrice){
    this.total = totalPrice;
    this.orderService.getOrdersDetail(id).subscribe(detail => {
      this.detail = detail;
      this.books = this.detail.books ;
    });
  }
  Del(){
    const status : string = 'Hủy';
    const Status: ChangeStatus = { status } as ChangeStatus;
    this.UserService.UpdateStatus(this.id,Status).subscribe(del => {
      this.od = del;
      this._snackBar.open("Huỷ thành công!","Đóng", {
        panelClass: "snackbarConfig1",
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      setTimeout(function(){ window.location.reload(); }, 500);
    })
  }
  DelOrder(id){
    this.id = id;
  }
}
