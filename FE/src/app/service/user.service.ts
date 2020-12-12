import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Review } from '../models/review';
import { Customer, LoginAdmin, User } from '../models/user';
import { Login, LoginReturn, Profile } from './../models/user';
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
  LoginAdminURL = 'http://localhost:8080/admins/login';
  UserURL = 'http://localhost:8080/users/customers';
  UpdateProFileURL ='http://localhost:8080/users/updateprofile';
  GetProFileURL ='http://localhost:8080/users/profile';
  Login(Login: Login): Observable<LoginReturn> {
    return this.http.post<LoginReturn>(this.LoginURL, Login);
  }
  LoginAdmin(Login: Login): Observable<LoginAdmin> {
    return this.http.post<LoginAdmin>(this.LoginAdminURL, Login);
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
  EditProfile( email: string, phone: string, name: string,gender: string,birthday:Date,address:string,image: File, token:string): Observable<any> {
    var formData1: any = new FormData();
    formData1.append('email', email);
    formData1.append('phone', phone);
    formData1.append('name', name);
    formData1.append('gender',gender);
    formData1.append('birthday', birthday);
    formData1.append('address', address);
    formData1.append('image', image);
  //   for (var value of formData1.values()) {
  //     console.log(value);
  //  }
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type':  'multipart/form-data; boundary=<calculated when request is sent>',
        // // 'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    // let headers = new HttpHeaders().set( 'Content-Type',  'application/x-www-form-urlencoded');
    // headers = headers.append('Content-Type',  'multipart/form-data; boundary=<calculated when request is sent>');
    // headers = headers.append('Authorization', `Bearer ${token}`)
    return this.http.patch(this.UpdateProFileURL, formData1, httpOptions).pipe();

  }
  getProfile(token:string): Observable<Profile>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.get<Profile>(this.GetProFileURL, httpOptions).pipe();
  }
  getToken(){
    return localStorage.getItem('token')
  }


}

