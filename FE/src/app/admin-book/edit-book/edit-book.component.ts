import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from 'src/app/service/book.service';
import { BookEdit, Books, Books1, Books2 } from 'src/app/models/book';
import { Location } from '@angular/common';
import { AuthorService } from 'src/app/service/author.service';
import { PublisherService } from 'src/app/service/publisher.service';
import { CateService } from 'src/app/service/cate.service';
import { Author } from 'src/app/models/author';
import { Publisher } from 'src/app/models/publisher';
import { Cate } from 'src/app/models/cate';
import { AuthorFromBook } from './../../models/book';
@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  book: BookEdit;
  bookk: Books;
  book1: Books1;
  book2: Books2;
  author: Author[];
  pub: Publisher[];
  cate: Cate[];
  FileUpload : File = null;
  selectFile = null;
  showMessage: string;
  imageURL = '/assets/image/00128.jpg';
  tempArr: any = { "category": [] };
  catData: any = { "category": [] };
  ischeked: boolean;
  categories: any[];
  MoreCat: boolean;
  autFBook: AuthorFromBook;
  get values() {
    return this.categories.filter(x => x.isChecked).map(x => x.name);
  }
  constructor(private route: ActivatedRoute, private BookService: BooksService, private location: Location,
    private AuthorService: AuthorService, private PubService: PublisherService, private CateService: CateService) { }

  async ngOnInit() {
    await this.getBookFromRoute();
    await this.getAllAuthor();
    await this.getAllCate();
    await this.getAllPub();

  }
  async getBookFromRoute() {
    const id = this.route.snapshot.paramMap.get('id');
    await this.BookService.getBooksFromID1(id).subscribe(res => this.book = res);
    //await console.log(this.book.categories);

  }

  // save() {
  //   this.BookService.editBook(this.book).toPromise();
  //   //alert('Thành Công')
  //   //this.goBack();
  // }
   save1( title: string, description: string,publishDate: Date, pageCount: number,
    price: number , availableQuantity: number , publisher: string , author: string, discount: number, image: File ) {
    const _id: string = this.route.snapshot.paramMap.get('id');
    let categories: any[] = [];
    categories = this.tempArr.category;
    const newBook: Books2 = {_id, title, description,publishDate, pageCount, price, availableQuantity,
                            publisher, author, categories, discount, image } as Books2;
    console.log(newBook);
    this.BookService.EditBookss1(_id, title, description, publishDate, pageCount, price, availableQuantity,
      publisher, author, categories, discount, image ).subscribe(res => this.book2 = res,
                                      error => this.showMessage = error);

  }
  // async save2( title: string, description: string,publishDate: Date, pageCount: number,
  //   price: number , availableQuantity: number , publisher: string , author: string,
  //   categories: string , discount: number , image: File ) {
  //   const _id: string = this.route.snapshot.paramMap.get('id');
  //   await this.BookService.EditBookss1(_id, title, description,publishDate, pageCount, price,
  //     availableQuantity, publisher, author, categories, discount, image ).toPromise().then(res => this.book1 = res,
  //                                     error => this.showMessage = error);
  //   console.log(this.book1);
  // }
  goBack(): void {
    this.location.back();
  }
  async getAllAuthor() {
    await this.AuthorService.getAuthors().subscribe(res =>this.author = res);
    //console.log(this.author[0].firstname);
  }
  async getAllPub() {
    await this.PubService.getPublishers().subscribe(res =>this.pub = res);
  }
  async getAllCate() {
    await this.CateService.getCates().subscribe(res =>this.cate = res);

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
  pushCat(){
    this.MoreCat = true;
    const cat: any[] = this.book.categories;
    const catMore = cat.filter(x => x._id).map(x => x._id);
    for( let a of catMore){
      this.tempArr.category.push(a);
    }
    console.log(this.tempArr);
    console.log(this.tempArr.category);
    //console.log(catMore);

    const cats: any[] = this.cate;
    console.log(cats);
    // for(let i = 0; i< this.tempArr.category.length; i++){
    //   const cat1More: any[] = cats.filter(cat => cat._id != this.tempArr.category[i] );
    //   console.log(Object.values(cat1More));
    // }

    const cat1More: any[] = cats.filter(cat => cat._id != this.tempArr.category );
    //console.log(Object.values(cat1More));
    for(var  i = 0; i< this.tempArr.category.length ; i++){
      for(var  j = 0; j< cats.length ; j++){
        if(cats[j]._id == this.tempArr.category[i]){
          cats.splice(j, 1);
        }
      }
    }

  }

}
