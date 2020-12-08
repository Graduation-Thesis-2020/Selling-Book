import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { Login, LoginReturn } from './../models/user';
import {MatSnackBar, MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { AppComponent } from '../app.component';
import { DefaultLayoutUserComponent } from '../default-layout-user/default-layout-user.component';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login;
  public mess: [];
  loginRes: LoginReturn;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private serService: UserService, private router: Router, private _snackBar: MatSnackBar,
              private appUser: DefaultLayoutUserComponent, private appcom: AppComponent
    ) { }

  ngOnInit() {
  }
  async login_user(email: string, password: string) {
    const Login: Login = { email, password } as Login;
    await this.serService.Login(Login).toPromise().then(res => this.loginRes = res, error => this.mess = error);
    if (this.mess == null) {
      console.log(this.loginRes.name);
      alert('Đăng nhập thành công!');
      localStorage.setItem('currentUser', JSON.stringify(this.loginRes));
      this.appUser.setName(this.loginRes.name, this.loginRes.role);
      if(this.loginRes.role == 1 || this.loginRes.role == 2 ){
        this.router.navigate(['/admin']);
      }
      if( this.loginRes.role == 0 ) {
        this.router.navigate(['/home']);
      }

    }
    else {
      //alert(this.mess.error.message);
    }
    this.mess=null;
    console.log(this.mess);
    // console.log(this.login);
    // console.log(this.mess);
  }
  openSnackBar() {
    this._snackBar.open('Cannonball!!', 'End now', {
      duration: 500,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
