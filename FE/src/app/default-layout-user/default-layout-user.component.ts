import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Author } from '../models/author';
import { Cate } from '../models/cate';
import { Publisher } from '../models/publisher';
import { AuthorService } from '../service/author.service';
import { BooksService } from '../service/book.service';
import { CateService } from '../service/cate.service';
import { PublisherService } from '../service/publisher.service';
import { Location } from '@angular/common';
import { Item } from '../models/cart';
import { Books } from '../models/book';
import { LoginReturn } from './../models/user';
import { UserService } from './../service/user.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { NotificationEmail } from '../models/order';

@Component({
  selector: 'app-default-layout-user',
  templateUrl: './default-layout-user.component.html',
  styleUrls: ['./default-layout-user.component.css']
})
export class DefaultLayoutUserComponent implements OnInit {
  cates: Cate[];
  pubs: Publisher[];
  auts: Author[];
  items: Item[] = [];
  total: number;
  countItem: number;
  books: Books[];
  dataSearch: string[];
  username: string;
  isLogin: boolean;
  role: number = null;
  user: LoginReturn;
  image: string;
  email: string;
  notification: boolean = false;
  userFromNot: LoginReturn;
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";
  constructor(private BooksService: BooksService,private PubService: PublisherService,
    private CateService: CateService,private AuthorService: AuthorService, private userService: UserService,
    private location: Location ,private _snackBar: MatSnackBar) {
      this.setName(this.username, this.role);
     }


    ngOnInit() {
        this.getAllCate();
        this.getAllPub();
        this.getAllAuthor();
        this.loadUser();

      }

    getAllCate() {
      this.CateService.getCates().subscribe(res => this.cates = res);
    }
    getAllPub() {
      this.PubService.getPublishers().subscribe(res => this.pubs = res);
    }
    getAllAuthor() {
      this.AuthorService.getAuthors().subscribe(res => this.auts = res);
    }
    refresh(): void {
      window.location.reload();
    }

    search(id: string){
      console.log(id);
      this.BooksService.searchBook(id).subscribe(book => this.books = book);
    }
    setName(name: string, role: number) {
      this.username = name;
      this.role = role;
      this.isLogin = true;
    }
    loadUser() {
      let user: LoginReturn = JSON.parse(localStorage.getItem("currentUser"));
      this.username = user.name;
      this.role = user.role
      this.image = user.imageUrl;
      this.email=user.email;
      this.notification = user.notification;
    }
    noti(){
      const notification: boolean = true;
      const notifi : NotificationEmail = {notification} as NotificationEmail;
      const token = localStorage.getItem('token');
      this.userService.Notification(notifi, token).subscribe(res => {
        this.userFromNot = res;
        this.notification = true;
        this._snackBar.open("Đăng kí thành công","Đóng", {
          panelClass: "snackbarConfig1",
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
    }
  }


