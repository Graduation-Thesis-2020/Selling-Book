import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { Login, LoginAdmin } from './../models/user';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  loginRes: LoginAdmin;
  mess: any;
  constructor(private UserService: UserService, private router: Router) { }

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
}
