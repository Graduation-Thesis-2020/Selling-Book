import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Books, Books1 } from '../models/book';
import { RootObj, RootObj2 } from '../models/root-obj';
import { ApiService } from './api.service';
import { Review } from '../models/review';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(
    private http: HttpClient
  ) { }
  URL = 'http://localhost:8080/reviews';
  BookURL = 'http://localhost:8080/books';

  getReview(): Observable<Review[]> {
    return this.http.get<Review[]>(this.URL).pipe();
  }

  getReviewFromID(id: string): Observable<Review> {
    const url = `${this.URL}/${id}`;
    return this.http.get<Review>(url).pipe();
  }
  getReviewFromIDBook(id: string): Observable<Review[]> {
    const url = `${this.BookURL}/${id}/reviews`;
    return this.http.get<Review[]>(url).pipe();
  }
  addReview(Review: Review): Observable<Review> {
    return this.http.post<Review>(this.URL, Review);
  }
  delete(id: string): Observable<Review> {
    return this.http.delete<Review>(`${this.URL}/${id}`);
  }
}

