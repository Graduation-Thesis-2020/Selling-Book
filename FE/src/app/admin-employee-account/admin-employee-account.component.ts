import { Component, OnInit } from '@angular/core';
import { AdminService } from './../service/admin.service';
import { LoginReturn, User, UpdateEmp } from './../models/user';
import {MatSnackBar, MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { error } from 'protractor';
import { AccountStatus, UpdateRoleAdmin } from './../models/admin';
@Component({
  selector: 'app-admin-employee-account',
  templateUrl: './admin-employee-account.component.html',
  styleUrls: ['./admin-employee-account.component.css']
})
export class AdminEmployeeAccountComponent implements OnInit {

  config: any;
  employees: LoginReturn[];
  employee: LoginReturn;
  id: string;
  gmail: string;
  mess: any;
  messError: string;
  messError1: string;
  status: string;
  messAcc: any;
  gender: string = null;
  idUp: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private AdminService: AdminService,private _snackBar: MatSnackBar,) {
    this.config = {
      itemsPerPage: 15,
      currentPage: 1
      };
  }

  ngOnInit() {
    this.getEmployee();
  }
  getEmployee(){
    const tokenAdmin = localStorage.getItem("tokenAdmin");
    this.AdminService.GetAllEmployee(tokenAdmin).subscribe(r => {this.employees = r; this.employee = this.employees[0]});
  }
  getEmployeeWithID(id){
    const tokenAdmin = localStorage.getItem("tokenAdmin");
    this.idUp = id;
    this.AdminService.GetOneEmployeeWithID(tokenAdmin,id).subscribe(r => this.employee = r);
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }
  getOneEmp(id, email){
    this.id = id;
    this.gmail = email;

  }
  search(name: string){
    const tokenAdmin = localStorage.getItem("tokenAdmin");
    this.AdminService.searchEmployeeAdmin(tokenAdmin,name).subscribe(r => this.employees = r,
      error => {
        this.mess = error;
        this.messError = this.mess.error.message;
        this.employees.length = 0;
    });
    this.messError = null;
  }
  reload(){
    this.messError = null;
    this.getEmployee();
  }
  delete(){
    const tokenAdmin = localStorage.getItem("tokenAdmin");
    this.AdminService.DeleteEmployee(tokenAdmin, this.id).subscribe(() => {
      this.getEmployee();
      this._snackBar.open("Xóa thành công!","Đóng", {
        panelClass: "snackbarConfig1",
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }, error => console.error(error));
  }
  upRole(){
    const tokenAdmin = localStorage.getItem("tokenAdmin");
    const role = 1;
    const upRole: UpdateRoleAdmin = {role} as UpdateRoleAdmin;
    this.AdminService.ChangeRole(tokenAdmin, this.id, upRole).subscribe(() => {
      this.getEmployee();
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
  onItemChange1(value) {
    this.gender = value;
  }
  add(name, phone, email, password, confirmPassword, birthday, address){
    const tokenAdmin = localStorage.getItem("tokenAdmin");
    const gender = this.gender;
    const newUser: User = {email,phone,password,confirmPassword,name,gender,birthday,address,} as User;
    console.log(newUser);
    this.AdminService.RegisterEmployee(newUser, tokenAdmin).subscribe(
      () => {
      this.getEmployee();
      this._snackBar.open("Tạo thành công!","Đóng", {
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
  edit(birthday1: Date){
    const tokenAdmin = localStorage.getItem("tokenAdmin");
    const name = this.employee.name;
    const phone = this.employee.phone;
    const address = this.employee.address;
    const gender = this.employee.gender;
    const birthday = birthday1;
    const EditEmp: UpdateEmp = {name,phone,address,gender,birthday} as UpdateEmp;
    console.log(EditEmp);

    this.AdminService.EditEmployee(EditEmp, tokenAdmin, this.idUp).subscribe(  () => {
      this.getEmployee();
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
