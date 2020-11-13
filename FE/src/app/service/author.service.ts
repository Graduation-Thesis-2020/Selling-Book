import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Books, Books1 } from '../models/book';
import { RootObj, RootObj1 } from '../models/root-obj';
import { ApiService } from './api.service';
import { Author } from '../models/author';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(
    private ApiService: ApiService,
    private http: HttpClient,
  ) { }
  URL = 'http://localhost:8080/books';
  authorURL = 'http://localhost:8080/authors';

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.authorURL).pipe();
  }
  getAuthorFromIDBook(id: string): Observable<Author> {
    const url = `${this.URL}/${id}/author`;
    return this.http.get<Author>(url).pipe();
  }
  getAuthorFromAuthorID(id: string): Observable<Author> {
    const url = `${this.authorURL}/${id}`;
    return this.http.get<Author>(url).pipe();
  }
  // tslint:disable-next-line: no-shadowed-variable
  addAuthor(Author: Author): Observable<Author> {
    return this.ApiService.post<Author>(this.authorURL, Author);
  }
  editAuthor(author: Author): Observable<any> {
    return this.http.put(`${this.authorURL}/${author._id}`, author, httpOptions).pipe();
  }
  delete(id: string): Observable<Author> {
    return this.http.delete<Author>(`${this.authorURL}/${id}`);
  }
  // delete(id: string): Observable<RootObj<Books>> {
  //   return this.ApiService.delete<RootObj<Books>>(`${this.ApiService.apiURL.getbooks}/${id}`);
  // }
}

