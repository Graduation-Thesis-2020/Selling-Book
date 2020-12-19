import { Component, OnInit } from '@angular/core';
import { Books, BookEdit, Books2 } from 'src/app/models/book';
import { BooksService } from 'src/app/service/book.service';
import { AuthorService } from 'src/app/service/author.service';
import { PublisherService } from 'src/app/service/publisher.service';
import { CateService } from 'src/app/service/cate.service';
import { Author } from 'src/app/models/author';
import { Publisher } from 'src/app/models/publisher';
import { Cate } from 'src/app/models/cate';
import { AuthorFromBook } from './../../models/book';
import {MatSnackBar, MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {
  books: BookEdit[];
  title = 'A';
  config: any;
  book: BookEdit;
  author: Author[];
  pub: Publisher[];
  cate: Cate[];
  MoreCat: boolean;
  FileUpload1 : File = null;
  FileUpload : File = null;
  selectFile = null;
  showMessage: string;
  imageURL = '/assets/image/00128.jpg';
  tempArr: any = { "category": [] };
  tempArrAdd: any = { "categoryAdd": [] };
  catData: any = { "category": [] };
  ischeked: boolean;
  categories: any[];
  book2: Books2;
  bookAdd: Books2;
  idDel: string;
  nameDel: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private BooksService: BooksService,private AuthorService: AuthorService, private _snackBar: MatSnackBar,
     private PubService: PublisherService, private CateService: CateService) {
    this.config = {
    itemsPerPage: 10,
    currentPage: 1
    };
  }

  pageChanged(event) {
  this.config.currentPage = event;
  }
  ngOnInit() {
    this.getAllBook();
     this.getAllAuthor();
     this.getAllCate();
     this.getAllPub();
  }

  getAllBook() {
    this.BooksService.getBooksAdmin().subscribe(res => {this.books = res, this.book= this.books[0]});
  }
  delete() {

    this.BooksService.delete(this.idDel).subscribe(() => {
        this.getAllBook();
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
  getDel(title, id) {
    this.nameDel = title;
    this.idDel = id;
  }
  getBook(_id) {
    this.BooksService.getBooksFromID1(_id).subscribe(res => this.book = res);
    //await console.log(this.book.categories);

  }
   getAllAuthor() {
     this.AuthorService.getAuthors().subscribe(res =>this.author = res);
     this.AuthorService.getAuthors().subscribe(res =>{this.author = res; console.log(this.author)});
    //console.log(this.author[0].firstname);
  }
   getAllPub() {
     this.PubService.getPublishers().subscribe(res =>this.pub = res);
  }
   getAllCate() {
     this.CateService.getCates().subscribe(res =>this.cate = res);

  }
  handleFileInput1(file: FileList) {
    this.FileUpload1 = file.item(0);
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageURL = event.target.result;
    }
    reader.readAsDataURL(this.FileUpload1);
    console.log(this.FileUpload1);
  }
  handleFileInput(file: FileList) {
    this.FileUpload = file.item(0);
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageURL = event.target.result;
    }
    reader.readAsDataURL(this.FileUpload);
    console.log(this.FileUpload);
  }
  onItemChange(value) {
    this.tempArr.category.push(value);
    console.log(this.tempArr);
  }
  onChange(value, isChecked: boolean) {
    if(isChecked) {
      this.tempArr.category.push(value);
    } else {
      let index = this.tempArr.category.indexOf(value);
      this.tempArr.category.splice(index,1);
    }
    console.log(this.tempArr);
  }
  onChangeAdd(value, isChecked: boolean) {
    if(isChecked) {
      this.tempArrAdd.categoryAdd.push(value);
    } else {
      let index = this.tempArrAdd.categoryAdd.indexOf(value);
      this.tempArrAdd.categoryAdd.splice(index,1);
    }
    console.log(this.tempArrAdd);
  }
  pushCat(){
    this.MoreCat = true;
    const cat: any[] = this.book.categories;
    const catMore = cat.filter(x => x._id).map(x => x._id);
    for( let a of catMore){
      this.tempArr.category.push(a);
    }
    const cats: any[] = this.cate;
    for(var  i = 0; i< this.tempArr.category.length ; i++){
      for(var  j = 0; j< cats.length ; j++){
        if(cats[j]._id == this.tempArr.category[i]){
          cats.splice(j, 1);
        }
      }
    }

  }
  saveEdit( title: string, description: string,publishDate: Date, pageCount: number,
    price: number , availableQuantity: number , publisher: string , author: string, discount: number, image: File ) {
    const _id: string = this.book._id;
    let categories: any[] = [];
    categories = this.tempArr.category;
    this.BooksService.EditBookss1(_id, title, description, publishDate, pageCount, price, availableQuantity,
      publisher, author, categories, discount, image ).subscribe(
        res => {
          this.book2 = res;
          console.log(this.book2);
          this.getAllBook();
          this._snackBar.open("Lưu thành công","Đóng", {
            panelClass: "snackbarConfig1",
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      },
        error => {
          this.showMessage = error;
          this._snackBar.open("Lưu thất bại","Đóng", {
            panelClass: "snackbarErrorConfig",
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        });
  }
  saveAdd( title: string, description: string,publishDate: Date, pageCount: number,
    price: number , availableQuantity: number , publisher: string , author: string, discount: number, image: File ) {
    let categories: any[] = [];
    categories = this.tempArrAdd.categoryAdd;
    // const newBook : Books2 = { title, description, publishDate, pageCount, price, availableQuantity,
    //   publisher, author, categories, discount, image} as Books2;
    // console.log("new: "+newBook);
    this.BooksService.addBookss1(title, description, publishDate, pageCount, price, availableQuantity,
      publisher, author, categories, discount, image ).subscribe(
        res => {
          this.bookAdd = res;
          console.log(this.bookAdd);
          this.getAllBook();
          this._snackBar.open("Thêm mới thành công","Đóng", {
            panelClass: "snackbarConfig1",
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
      },
          error => {
            this.showMessage = error;
            this._snackBar.open("Thêm mới thất bại","Đóng", {
              panelClass: "snackbarErrorConfig",
              duration: 3000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          });

  }
  search(title: string){
    this.BooksService.searchBookAdmin(title).subscribe(res => this.books = res);
  }
  reload(){
    this.getAllBook();
  }
}
