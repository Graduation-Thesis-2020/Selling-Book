import { Component, OnInit, Input } from '@angular/core';
import { Books, Books1 } from 'src/app/models/book';
import { BooksService } from 'src/app/service/book.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthorService } from 'src/app/service/author.service';
import { PublisherService } from 'src/app/service/publisher.service';
import { CateService } from 'src/app/service/cate.service';
import { Publisher } from 'src/app/models/publisher';
import { Cate } from 'src/app/models/cate';
import { Author } from 'src/app/models/author';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  @Input()
  aaa = 'aaaa';
  Book: Books1;
  BookData: Books1;
  showMessage: Object;
  files: any[];
  imageURL = '/assets/image/00128.jpg';
  FileUpload : File = null;
  selectFile = null;
  images;
  form: FormGroup;
  preview: string;
  author: Author[];
  publisher: Publisher[];
  cate: Cate[];

  constructor(private BooksService: BooksService, private http: HttpClient, private fb: FormBuilder,
              private AuthorService: AuthorService, private PubService: PublisherService, private CateService: CateService) {
    // this.form = this.fb.group({
    //   title: [''],
    //   description: [''],
    //   pageCount: [''],
    //   price: [''],
    //   availableQuantity: [''],
    //   publisher: [''],
    //   author: [''],
    //   categories: [''],
    //   discount: [''],
    //   image: [null]
    // })
   }

  async ngOnInit() {
    await this.getAllAuthor();
    await this.getAllCate();
    await this.getAllPub();

  }
  // uploadFile(event) {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   this.form.patchValue({
  //     image: file
  //   });
  //   this.form.get('image').updateValueAndValidity()

  //   // File Preview
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.preview = reader.result as string;
  //   }
  //   reader.readAsDataURL(file);
  //   console.log(file);
  //   console.log(this.preview);
  // }
  // submitForm() {
  //   this.BooksService.addBookss(
  //     this.form.value.title,
  //     this.form.value.description,
  //     this.form.value.pageCount,
  //     this.form.value.price,
  //     this.form.value.availableQuantity,
  //     this.form.value.publisher,
  //     this.form.value.author,
  //     this.form.value.categories,
  //     this.form.value.discount,
  //     this.form.value.image,
  //   ).subscribe();
  // }


  async save(title: string, description: string, pageCount: number,
          price: number , availableQuantity: number , publisher: string , author: string,
           categories: string , discount: number , image: File ) {
    const newBook: Books1 = { title, description, pageCount, price, availableQuantity,
                              publisher, author, categories, discount, image } as Books1;
    await this.BooksService.addBook(newBook).toPromise().then(res => this.Book = res,
                                           error => this.showMessage = error);

    await alert(this.showMessage);

  }
  async save2(title: string, description: string,publishDate: Date, pageCount: number,
    price: number , availableQuantity: number , publisher: string , author: string,
     categories: string , discount: number , image: File ) {

  await this.BooksService.addBookss(title, description,publishDate, pageCount, price,
     availableQuantity, publisher, author, categories, discount, image ).toPromise().then(res => this.BookData = res,
                                     error => this.showMessage = error);

  await alert('Thêm Thành Công!');

  }
  async save1(title: string, description: string,publishDate: Date, pageCount: number,
    price: number , availableQuantity: number , publisher: string , author: string,
    categories: string , discount: number , image: File ) {
    const newBook: Books1 = { title, description,publishDate, pageCount, price, availableQuantity,
                            publisher, author, categories, discount, image } as Books1;
    console.log(newBook);

  }
  onFileChanged(event: any) {
    this.files = event.target.files;
    //console.log(this.files);
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

  onPicked(input: HTMLInputElement) {
    const file = input.files[0];
    console.log(file);
  }
  selectImage(event){
    if (event.target.files.length > 0 ) {
      const file = event.target.files[0];
      this.images = file;
    }
  }
  // onSubmit(){
  //   const formData = new FormData();
  //   formData.append('image', this.images);
  //   formData.append('image', this.images);
  //   formData.append('image', this.images);
  //   formData.append('image', this.images);
  //   formData.append('image', this.images);
  //   formData.append('image', this.images);
  //   formData.append('image', this.images);
  //   formData.append('image', this.images);

  //   this.http.post<any>('http://localhost:8080/books', formData).subscribe();
  // }
  async getAllAuthor() {
    await this.AuthorService.getAuthors().subscribe(res =>this.author = res);
    //console.log(this.author[0].firstname);
  }
  async getAllPub() {
    await this.PubService.getPublishers().subscribe(res =>this.publisher = res);
  }
  async getAllCate() {
    await this.CateService.getCates().subscribe(res =>this.cate = res);
  }
}
