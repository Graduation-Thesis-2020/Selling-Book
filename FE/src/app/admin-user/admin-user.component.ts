import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/user';
import { UserService } from './../service/user.service';
import { AdminService } from './../service/admin.service';
import { LoginReturn } from './../models/user';
import {MatSnackBar, MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { error } from 'protractor';
import { AccountStatus } from './../models/admin';
@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  config: any;
  cus: Customer[];
  customers: LoginReturn[];
  id: string;
  email: string;
  mess: any;
  messError: string;
  status: string;
  messAcc: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private AdminService: AdminService,private _snackBar: MatSnackBar,) {
    this.config = {
      itemsPerPage: 15,
      currentPage: 1
      };
   }

  ngOnInit() {
    this.getCustomer();
  }
  getCustomer(){
    const tokenAdmin = localStorage.getItem("tokenAdmin");
    this.AdminService.GetAllCustomer(tokenAdmin).subscribe(r => this.customers = r);
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
  getOneCus(id, email, status){
    this.id = id;
    this.email = email;
    this.status = status;
  }
  delete(){
    const tokenAdmin = localStorage.getItem("tokenAdmin");
    this.AdminService.DeleteCustomer(tokenAdmin, this.id).subscribe(() => {
      this.getCustomer();
      this._snackBar.open("Xóa thành công!","Đóng", {
        panelClass: "snackbarConfig1",
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }, error => console.error(error));
  }
  search(name: string){
    const tokenAdmin = localStorage.getItem("tokenAdmin");
    this.AdminService.searchCustomerAdmin(tokenAdmin,name).subscribe(r => this.customers = r,
      error => {
        this.mess = error;
        this.messError = this.mess.error.message;
        console.log(this.messError);
        this.customers.length = 0;
    });
    this.messError = null;
  }
  reload(){
    this.messError = null;
    this.getCustomer();
  }
  lock(){
    const  status : string = "Khóa";
    const tokenAdmin = localStorage.getItem("tokenAdmin");
    const AccountStatus : AccountStatus = {status} as AccountStatus;
    this.AdminService.ChangeStatus(tokenAdmin, this.id, AccountStatus).subscribe(
      r => {
        this.messAcc = r;
        this.getCustomer();
        this._snackBar.open("Khóa thành công!","Đóng", {
          panelClass: "snackbarConfig1",
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }, error => console.error(error)
    );
  }
  unlock(){
    const  status : string = null;
    const tokenAdmin = localStorage.getItem("tokenAdmin");
    const AccountStatus : AccountStatus = {status} as AccountStatus;
    this.AdminService.ChangeStatus(tokenAdmin, this.id, AccountStatus).subscribe(
      r => {
        this.messAcc = r;
        this.getCustomer();
        this._snackBar.open("Mở khóa thành công!","Đóng", {
          panelClass: "snackbarConfig1",
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }, error => console.error(error)
    );
  }
}
