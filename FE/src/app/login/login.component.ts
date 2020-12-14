import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { Login, LoginReturn } from './../models/user';
import {MatSnackBar, MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { AppComponent } from '../app.component';
import { DefaultLayoutUserComponent } from '../default-layout-user/default-layout-user.component';
import { first } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { stat } from 'fs';
import { error } from 'protractor';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login;
  public mess: [];
  loginRes: LoginReturn;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private serService: UserService, private router: Router, private _snackBar: MatSnackBar,
              private appUser: DefaultLayoutUserComponent, private appcom: AppComponent,
              private http: HttpClient
    ) { }

  ngOnInit() {
  }
  async login_user1(email: string, password: string) {
    const Login: Login = { email, password } as Login;
    await this.serService.Login(Login).toPromise().then(res => this.loginRes = res, error => this.mess = error);
    if (this.mess == null) {
      console.log(this.loginRes);
      alert('Đăng nhập thành công!');
      localStorage.setItem('currentUser', JSON.stringify(this.loginRes));
      this.appUser.setName(this.loginRes.name, this.loginRes.role);

      if( this.loginRes.role == 0 ) {
        this.router.navigate(['/home']);
      }

    }
    else {
      //alert(this.mess.error.message);
      alert('Đăng nhập thất bại!');
    }
    this.mess=null;
  }

  login_user(email: string, password: string) {
    const Login: Login = { email, password } as Login;
    let url = 'http://localhost:8080/users/login';


    this.http.post(url, Login, { observe: 'response' })
      .subscribe((response: HttpResponse<any>) => {

        let currentUser = response.body;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));;
        let token = response.headers.get("Authorization");
        localStorage.setItem('token', token);
        let status = response.status;
        if (status == 200) {
          if( response.body.role == 0 ) {
            this.router.navigate(['/home']);
            this._snackBar.open("Đăng nhập thành công","Đóng", {
              panelClass: "snackbarConfig1",
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
        }

      }, (error: HttpErrorResponse) => {
        console.log(error);
        if(error){
          this._snackBar.open("Sai mật khẩu hoặc tài khoản","Đóng", {
            panelClass: "snackbarErrorConfig",
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      }
      )};

  openSnackBar() {
    this._snackBar.open('Cannonball!!', 'End now', {
      duration: 500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
