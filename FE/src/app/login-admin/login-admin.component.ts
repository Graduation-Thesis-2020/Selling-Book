import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { Login, LoginAdmin } from './../models/user';
import {MatSnackBar, MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  loginRes: LoginAdmin;
  mess: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private UserService: UserService, private router: Router,private http: HttpClient,private _snackBar: MatSnackBar,) { }

  ngOnInit() {
  }
  login(email: string, password: string) {
    const Login: Login = { email, password } as Login;
    this.UserService.LoginAdmin(Login).subscribe(res => this.loginRes = res, error => this.mess = error);
    if (this.loginRes) {
      console.log(this.loginRes);
      alert('Đăng nhập thành công!');
      localStorage.setItem('currentAdmin', JSON.stringify(this.loginRes));
      if(this.loginRes.role == 1 || this.loginRes.role == 2 ){
        this.router.navigate(['/admin']);
      }
    }
    else {
      alert('Đăng nhập thất bại!');
    }
    this.mess=null;
  }
  login_admin(email: string, password: string) {
    const Login: Login = { email, password } as Login;
    let url = 'http://localhost:8080/admins/login';


    this.http.post(url, Login, { observe: 'response' })
      .subscribe((response: HttpResponse<any>) => {
        console.log(response);

        let currentAdmin = response.body;
        localStorage.setItem('currentAdmin', JSON.stringify(currentAdmin));;
        let token = response.headers.get("Authorization");
        localStorage.setItem('tokenAdmin', token);
        let status = response.status;
        if (status == 200) {
          if( response.body.role != 0 ) {
            this.router.navigate(['/admin']);
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
}
