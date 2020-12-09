import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Review } from '../models/review';
import { Customer, User } from '../models/user';
import { Login, LoginReturn } from './../models/user';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
const httpOptions1 = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }),
  observe: 'response' as 'response'
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
  login(Login: Login) {
    return this.http.post<any>(this.LoginURL, Login).pipe(map(res => console.log("header: " + res.headers.get("Authorization") )));
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
  getToken(){
    return localStorage.getItem('token')
  }


}

