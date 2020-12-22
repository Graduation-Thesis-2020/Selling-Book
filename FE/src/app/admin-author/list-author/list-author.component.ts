import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/models/author';
import { AuthorService } from 'src/app/service/author.service';
import {MatSnackBar, MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
@Component({
  selector: 'app-list-author',
  templateUrl: './list-author.component.html',
  styleUrls: ['./list-author.component.css']
})
export class ListAuthorComponent implements OnInit {
  authors: Author[];
  title = 'A';
  config: any;
  author: Author;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  mess: any;
  messError: string;
  constructor(private AuthorService: AuthorService,  private _snackBar: MatSnackBar,) {
    this.config = {
    itemsPerPage: 15,
    currentPage: 1
    };
  }

  pageChanged(event) {
  this.config.currentPage = event;
  }

  ngOnInit() {
    this.getAllAuthor();
  }

  getAllAuthor() {
    this.AuthorService.getAuthors().subscribe(res =>{this.authors = res; this.author=this.authors[0]});
  }

  delete(id) {
    this.AuthorService.delete(id).subscribe(() => {
      this.getAllAuthor();
      this._snackBar.open("Xóa thành công","Đóng", {
        panelClass: "snackbarConfig1",
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      }, error =>{
        this._snackBar.open("Xóa thất bại","Đóng", {
          panelClass: "snackbarErrorConfig",
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
  }
  save(name: string, firstname: string, lastname: string ) {
    const newAuthor: Author = { name, firstname, lastname } as Author;
    this.AuthorService.addAuthor(newAuthor).subscribe(
      res => {
        this.author = res;
        this.getAllAuthor();
        this._snackBar.open("Thêm thành công","Đóng", {
          panelClass: "snackbarConfig1",
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
    }, error =>{
      this._snackBar.open("Thêm thất bại","Đóng", {
        panelClass: "snackbarErrorConfig",
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    });

  }
  Edit() {
    this.AuthorService.editAuthor(this.author).subscribe(() => {this.getAllAuthor();
      this._snackBar.open("Chỉnh sửa thành công","Đóng", {
        panelClass: "snackbarConfig1",
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      },  error =>{
        this._snackBar.open("Chỉnh sửa thất bại","Đóng", {
          panelClass: "snackbarErrorConfig",
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
  }
  getAuthor(_id){
    this.AuthorService.getAuthorFromAuthorID(_id).subscribe(res => this.author = res);
  }
  search(title: string){
    this.AuthorService.searchAuthorAdmin(title).subscribe(res => this.authors = res,
      error => {
        this.mess = error;
        this.messError = this.mess.error.message;
        this.authors.length = 0;

    });
    this.messError = null;
  }
  reload(){
    this.messError = null;
    this.getAllAuthor();
  }
}
