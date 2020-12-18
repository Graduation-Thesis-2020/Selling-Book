import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { LoginAdmin } from '../models/user';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private http: HttpClient
  ) { }
  getToken(){
    return localStorage.getItem('token');
  }
  getCurrentAdmin(){
    let user: LoginAdmin = JSON.parse(localStorage.getItem("currentAdmin"));
    return user;
  }
}

