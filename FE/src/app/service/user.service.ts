import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Review } from '../models/review';
import { Customer, User } from '../models/user';
import { Login } from './../models/user';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private http: HttpClient
  ) { }
  SignupURL = 'http://localhost:8080/users/dashboard/customers/register';
  LoginURL = 'http://localhost:8080/users/dashboard/customers/login';
  UserURL = 'http://localhost:8080/users/customers';
  Login(Login: Login): Observable<Login> {
    return this.http.post<Login>(this.LoginURL, Login);
  }
  Signup(User: User): Observable<User> {
    return this.http.post<User>(this.SignupURL, User);
  }
  getCustomer(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.UserURL).pipe();
  }
  // getReview(): Observable<Review[]> {
  //   return this.http.get<Review[]>(this.URL).pipe();
  // }

  // getReviewFromID(id: string): Observable<Review> {
  //   const url = `${this.URL}/${id}`;
  //   return this.http.get<Review>(url).pipe();
  // }
  // getReviewFromIDBook(id: string): Observable<Review[]> {
  //   const url = `${this.BookURL}/${id}/reviews`;
  //   return this.http.get<Review[]>(url).pipe();
  // }
  // addReview(Review: Review): Observable<Review> {
  //   return this.http.post<Review>(this.URL, Review);
  // }
  // delete(id: string): Observable<Review> {
  //   return this.http.delete<Review>(`${this.URL}/${id}`);
  // }
}

