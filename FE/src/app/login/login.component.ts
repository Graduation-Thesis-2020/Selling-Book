import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { Login } from './../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login;
  public mess: [];
  constructor(private serService: UserService, private router: Router) { }

  ngOnInit() {
  }
  async login_user(email: string, password: string) {
    const Login: Login = { email, password } as Login;
    await this.serService.Login(Login).toPromise().then(res => this.login = res, error => this.mess = error);
    if (this.mess == null) {
      console.log(this.login.user.email);
      alert('Đăng nhập thành công!');
      if(this.login.user.email == 'quangtan14011991@gmail.com'){
        this.router.navigate(['/admin'])
      }
      else {
        this.router.navigate(['/home'])
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

}
