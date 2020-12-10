import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginAdmin } from '../models/user';

@Component({
  selector: 'app-default-layout-admin',
  templateUrl: './default-layout-admin.component.html',
  styleUrls: ['./default-layout-admin.component.css']
})
export class DefaultLayoutAdminComponent implements OnInit {
  username: string;
  isLogin: boolean;
  role: number = null;
  constructor( private router: Router) { }

  ngOnInit() {
    this.loadUser();
  }
  loadUser() {
    let user: LoginAdmin = JSON.parse(localStorage.getItem("currentAdmin"));
    this.username = user.name;
    this.role = user.role
  }
  logout() {
    localStorage.removeItem('currentAdmin');
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/login/admin']); // navigate to same route
  });
  }
}
