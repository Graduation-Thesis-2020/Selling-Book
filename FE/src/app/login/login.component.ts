import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  mess: string;
  constructor(private serService: UserService, private router: Router) { }

  ngOnInit() {
  }
  async login(email: string, password: string) {
    const Login: User = { email, password } as User;
    await this.serService.Login(Login).subscribe(res => this.user = res, error => this.mess = error);
    if (this.mess != null) {
      this.mess = 'Sai email hoặc mật khẩu!';
      alert(this.mess);
    }
    else {
      this.mess ='Đăng nhập thành công!';
      alert(this.mess);
      this.router.navigate(['/admin'])
    }

  }

}
