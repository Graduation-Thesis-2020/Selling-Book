import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/user';
import { UserService } from './../service/user.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {

  config: any;
  cus: Customer[];
  constructor(private UserService: UserService) {
    this.config = {
      itemsPerPage: 15,
      currentPage: 1
      };
   }

  ngOnInit() {
    this.getCustomer();
  }
  getCustomer(){
    this.UserService.getCustomer().subscribe(r => this.cus = r);
  }
  pageChanged(event) {
    this.config.currentPage = event;
    }
}
