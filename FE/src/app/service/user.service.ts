import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Review } from '../models/review';
import { Customer, User } from '../models/user';
import { Login, LoginReturn } from './../models/user';



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
  SignupURL = 'http://localhost:8080/users/register';
  LoginURL = 'http://localhost:8080/users/login';
  UserURL = 'http://localhost:8080/users/customers';
  UpdateProFileURL ='http://localhost:8080/users/updateprofile';
  Login(Login: Login): Observable<LoginReturn> {
    return this.http.post<LoginReturn>(this.LoginURL, Login);
  }
  Signup(User: User): Observable<User> {
    return this.http.post<User>(this.SignupURL, User);
  }
  getCustomer(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.UserURL).pipe();
  }
  EditProfile( email: string, phone: string, name: string,gender: string,birthday:Date,address:string,image: File): Observable<any> {
    var formData: any = new FormData();
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('name', name);
    formData.append('gender',gender);
    formData.append('birthday', birthday);
    formData.append('address', address);
    formData.append('image', image);

    return this.http.patch(this.UpdateProFileURL, formData).pipe();

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

