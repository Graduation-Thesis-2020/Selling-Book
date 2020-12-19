import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Books, Books1, Books2, BooksInCart } from '../models/book';
import { RootObj, RootObj2 } from '../models/root-obj';
import { ApiService } from './api.service';
import { BookEdit } from 'src/app/models/book';
import { BookNew } from './../models/book';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
    private ApiService: ApiService,
    private http: HttpClient
  ) { }
  bookURL = 'http://localhost:8080/books';

  getBooks(): Observable<Books[]> {
    return this.ApiService.get<Books[]>(this.bookURL).pipe();
  }
  getBooksAdmin(): Observable<BookEdit[]> {
    return this.ApiService.get<BookEdit[]>(this.bookURL).pipe();
  }
  addBook(Books2: Books1): Observable<Books1> {
    return this.http.post<Books1>(this.bookURL, Books2 );
  }
  addBook1(Books2: Books1): Observable<Books1> {
    return this.http.post<Books1>(this.bookURL, Books2 );
  }
  delete(id: string): Observable<Books> {
    return this.ApiService.delete<Books>(`${this.bookURL}/${id}`);
  }
  getBooksInCartFromID(id: string): Observable<BooksInCart> {
    const url = `${this.bookURL}/${id}`;
    return this.http.get<BooksInCart>(url).pipe();
  }
  getBooksFromID(id: string): Observable<Books> {
    const url = `${this.bookURL}/${id}`;
    return this.http.get<Books>(url).pipe();
  }
  getBookDetailFromID(id: string): Observable<BookNew> {
    const url = `${this.bookURL}/${id}`;
    return this.http.get<BookNew>(url).pipe();
  }
  getBooksFromID1(id: string): Observable<BookEdit> {
    const url = `${this.bookURL}/${id}`;
    return this.http.get<BookEdit>(url).pipe();
  }
  getBooksFromCateID(id: string): Observable<Books[]> {
    const url = `${this.bookURL}/${id}/categories`;
    return this.http.get<Books[]>(url).pipe();
  }
  getBooksFromPubID(id: string): Observable<Books[]> {
    const url = `${this.bookURL}/${id}/publishers`;
    return this.http.get<Books[]>(url).pipe();
  }
  getBooksFromAuthorID(id: string): Observable<Books[]> {
    const url = `${this.bookURL}/${id}/authors`;
    return this.http.get<Books[]>(url).pipe();
  }
  searchBook(id: string): Observable<Books[]> {
    const url = `${this.bookURL}/search?title=${id}`;
    return this.http.get<Books[]>(url).pipe();
  }
  searchBookAdmin(id: string): Observable<BookEdit[]> {
    const url = `${this.bookURL}/search?title=${id}`;
    return this.http.get<BookEdit[]>(url).pipe();
  }
  searchBookWithCat(id: string, name: string): Observable<Books[]> {
    const url = `${this.bookURL}/${id}/category/search?title=${name}`;
    return this.http.get<Books[]>(url).pipe();
  }
  searchBookWithPub(id: string, name: string): Observable<Books[]> {
    const url = `${this.bookURL}/${id}/publisher/search?title=${name}`;
    return this.http.get<Books[]>(url).pipe();
  }
  searchBookWithAut(id: string, name: string): Observable<Books[]> {
    const url = `${this.bookURL}/${id}/author/search?title=${name}`;
    return this.http.get<Books[]>(url).pipe();
  }
  searchBookSale( name: string): Observable<Books[]> {
    const url = `${this.bookURL}/discount/search?title=${name}`;
    return this.http.get<Books[]>(url).pipe();
  }
  editBook(book: Books): Observable<any> {
    return this.http.patch(`${this.bookURL}/${book._id}`, book, httpOptions).pipe();
  }
  addBookss(title: string, description: string,publishDate:Date, pageCount: number,
    price: number , availableQuantity: number , publisher: string , author: string,
     categories: string , discount: number , image: File): Observable<any> {
    var formData: any = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('publishDate',publishDate);
    formData.append('pageCount', pageCount);
    formData.append('price', price);
    formData.append('availableQuantity', availableQuantity);
    formData.append('publisher', publisher);
    formData.append('author', author);
    formData.append('categories', categories);
    formData.append('discount', discount);
    formData.append('image', image);

    return this.http.post<Books1>(this.bookURL, formData)
  }
  addBookss1(title: string, description: string,publishDate:Date, pageCount: number,
    price: number , availableQuantity: number , publisher: string , author: string,
     categories: string[] , discount: number , image: File): Observable<any> {
    var formData: any = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('publishDate',publishDate);
    formData.append('pageCount', pageCount);
    formData.append('price', price);
    formData.append('availableQuantity', availableQuantity);
    formData.append('publisher', publisher);
    formData.append('author', author);
    for (let cate of categories) {
      formData.append('categories[]', cate);
    }
    formData.append('discount', discount);
    formData.append('image', image);

    return this.http.post<Books1>(this.bookURL, formData)
  }
  EditBookss(book): Observable<any> {
    var formData: any = new FormData();
    formData.append('_id', book._id);
    formData.append('title', book.title);
    formData.append('description', book.description);
    formData.append('publishDate', book.publishDate);
    formData.append('pageCount', book.pageCount);
    formData.append('price',book. price);
    formData.append('availableQuantity', book.availableQuantity);
    formData.append('publisher', book.publisher);
    formData.append('author', book.author);
    formData.append('categories', book.categories);
    formData.append('discount', book.discount);
    formData.append('image', book.image);

    return this.http.put<Books1>(`${this.bookURL}/${book._id}`, formData, httpOptions).pipe();
  }
  EditBookss1(_id:string, title: string, description: string,publishDate:Date, pageCount: number,
    price: number , availableQuantity: number , publisher: string , author: string,
     categories: string[] , discount: number , image: File): Observable<any> {
    var formData: any = new FormData();
    formData.append('_id', _id);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('publishDate',publishDate);
    formData.append('pageCount', pageCount);
    formData.append('price', price);
    formData.append('availableQuantity', availableQuantity);
    formData.append('publisher', publisher);
    formData.append('author', author);
    for (let cate of categories) {
      formData.append('categories[]', cate);
    }
    formData.append('discount', discount);
    formData.append('image', image);
  //   for (var value of formData.values()) {
  //     console.log(value);
  //  }

    return this.http.patch(`${this.bookURL}/${_id}`, formData).pipe();

  }
  getBooksBestSeller(): Observable<Books[]> {
    const url = `${this.bookURL}/5fc5e3ea2364e00df46c4550/categories`;
    return this.http.get<Books[]>(url).pipe();
  }
  getBooksComingSoon(): Observable<Books[]> {
    const url = `${this.bookURL}/5fc5e3fd2364e00df46c4551/categories`;
    return this.http.get<Books[]>(url).pipe();
  }
  getBooksSale(): Observable<Books[]> {
    const url = `${this.bookURL}/discount`;
    return this.http.get<Books[]>(url).pipe();
  }
}

