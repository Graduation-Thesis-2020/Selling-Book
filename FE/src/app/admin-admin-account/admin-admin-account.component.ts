import { Component, OnInit } from '@angular/core';
import { AdminService } from './../service/admin.service';
import { LoginReturn, UpdateEmp, User } from './../models/user';
import {MatSnackBar, MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { error } from 'protractor';
import { AccountStatus, UpdateRoleAdmin } from './../models/admin';
@Component({
  selector: 'app-admin-admin-account',
  templateUrl: './admin-admin-account.component.html',
  styleUrls: ['./admin-admin-account.component.css']
})
export class AdminAdminAccountComponent implements OnInit {

  config: any;
  admins: LoginReturn[];
  admin: LoginReturn;
  id: string;
  email: string;
  mess: any;
  messError: string;
  messError1: string;
  status: string;
  messAcc: any;
  gender: string = null;
  idUp: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  tokenAdmin = localStorage.getItem("tokenAdmin");
  constructor(private AdminService: AdminService,private _snackBar: MatSnackBar,) {

  }
  ngOnInit() {
    this.getAdmin();
  }
  getAdmin(){
    this.AdminService.GetAllAdmin(this.tokenAdmin).subscribe(r => {this.admins = r; this.admin = this.admins[0]});
  }
  getOneAdmin(id, email){
    this.id = id;
    this.email = email;
  }
  getAdminWithID(id){
    const tokenAdmin = localStorage.getItem("tokenAdmin");
    this.idUp = id;
    this.AdminService.GetOneEmployeeWithID(tokenAdmin,id).subscribe(r => this.admin = r);
  }
  delete(){
    this.AdminService.DeleteCustomer(this.tokenAdmin, this.id).subscribe(() => {
      this.getAdmin();
      this._snackBar.open("Xóa thành công!","Đóng", {
        panelClass: "snackbarConfig1",
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }, error => console.error(error));
  }
  downRole(){
    const role = 2;
    const upRole: UpdateRoleAdmin = {role} as UpdateRoleAdmin;
    this.AdminService.ChangeRole(this.tokenAdmin, this.id, upRole).subscribe(() => {
      this.getAdmin();
      this._snackBar.open("Chuyển thành công!","Đóng", {
        panelClass: "snackbarConfig1",
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }, error => console.error(error));
  }
  onItemChange(value) {
    this.gender = value;
  }
  edit(birthday1: Date){
    const tokenAdmin = localStorage.getItem("tokenAdmin");
    const name = this.admin.name;
    const phone = this.admin.phone;
    const address = this.admin.address;
    const gender = this.admin.gender;
    const birthday = birthday1;
    const EditEmp: UpdateEmp = {name,phone,address,gender,birthday} as UpdateEmp;
    console.log(EditEmp);

    this.AdminService.EditEmployee(EditEmp, tokenAdmin, this.idUp).subscribe(  () => {
      this.getAdmin();
      this._snackBar.open("Chỉnh sửa thành công!","Đóng", {
        panelClass: "snackbarConfig1",
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }, error => {
      this.mess = error;
      this.messError1 = this.mess.error.message;
      this._snackBar.open(this.messError1,"Đóng", {
        panelClass: "snackbarErrorConfig",
        duration: 10000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });
  }
}
