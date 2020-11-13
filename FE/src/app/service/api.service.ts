import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Books } from '../models/book';
import { RootObj } from '../models/root-obj';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }
  baseURL = 'http://localhost:8080/';
  apiURL = {
  getbooks: `${this.baseURL}books`,
  getauthors: `${this.baseURL}authors`,
  };


  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }
  post<T>(url: string, books: Object): Observable<T> {
    return this.http.post<T>(url, books);
  }
  put<T>(url: string, books: Object): Observable<T> {
    return this.http.put<T>(url, books);
  }
  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}

