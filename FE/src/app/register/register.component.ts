import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../service/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  constructor(private route: ActivatedRoute, private serService: UserService
  ) { }

  ngOnInit() {
  }
  signup(email: string, password: string) {
    const newUser: User = { email, password } as User;
    this.serService.Signup(newUser).subscribe(res => this.user = res);
    alert('Đăng Ký Thành Công!');
    console.log(this.user.email);
    console.log(this.user.password);
  }
}
