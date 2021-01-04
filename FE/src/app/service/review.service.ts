import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Books, Books1 } from '../models/book';
import { RootObj, RootObj2 } from '../models/root-obj';
import { ApiService } from './api.service';
import { CommentChild, Rating, Review, ReviewBook, ReviewChildDetail, ReviewDetail } from '../models/review';



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
  UserURL = 'http://localhost:8080/users';

  getReview(): Observable<Review[]> {
    return this.http.get<Review[]>(this.URL).pipe();
  }
  getReviewDetail(): Observable<ReviewDetail[]> {
    return this.http.get<ReviewDetail[]>(this.URL).pipe();
  }


  getReviewFromID(id: string): Observable<ReviewDetail> {
    const url = `${this.URL}/${id}`;
    return this.http.get<ReviewDetail>(url).pipe();
  }
  getReviewdetailFromID(id: string): Observable<ReviewBook> {
    const url = `${this.BookURL}/${id}`;
    return this.http.get<ReviewBook>(url).pipe();
  }
  getCommentFromIDBook(id: string): Observable<ReviewDetail[]> {
    const url = `${this.URL}/${id}/book`;
    return this.http.get<ReviewDetail[]>(url).pipe();
  }
  getReviewFromIDBook(id: string): Observable<Review[]> {
    const url = `${this.BookURL}/${id}/reviews`;
    return this.http.get<Review[]>(url).pipe();
  }
  addReview(Review: Review, id: string, token: string): Observable<Review> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    const url = `${this.UserURL}/${id}/comment`;
    return this.http.post<Review>(url, Review, httpOptions).pipe();
  }
  delete(id: string): Observable<Review> {
    return this.http.delete<Review>(`${this.URL}/${id}`);
  }
  deleteChild(idChild: string): Observable<ReviewChildDetail> {
    return this.http.delete<ReviewChildDetail>(`${this.URL}/commentchild/${idChild}`);
  }
  getRatingBook(id: string): Observable<Rating> {
    const url = `${this.BookURL}/${id}/averageReview`;
    return this.http.get<Rating>(url).pipe();
  }
  CommentChild(Cmt: CommentChild, id: string, token: string, idReview: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    const url = `${this.UserURL}/${id}/comment/${idReview}`;
    return this.http.post(url, Cmt, httpOptions).pipe();
  }
  LikeComment( id: string, token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    const url = `${this.UserURL}/like/${id}`;
    return this.http.get(url, httpOptions).pipe();
  }
  LikeCommentChild( id: string, token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    const url = `${this.UserURL}/likecommentchild/${id}`;
    return this.http.get(url, httpOptions).pipe();
  }
  searchReviewAdmin(id: string): Observable<ReviewDetail[]> {
    const url = `${this.URL}/CommentByBook/search?title=${id}`;
    return this.http.get<ReviewDetail[]>(url).pipe();
  }
}

