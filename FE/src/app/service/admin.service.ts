import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Login, LoginReturn, Profile, FormChangePassword, User, UpdateEmp } from './../models/user';
import { AccountStatus, UpdateRoleAdmin } from './../models/admin';





@Injectable({
  providedIn: 'root'
})

export class AdminService {

  constructor(
    private http: HttpClient
  ) { }
  URL='http://localhost:8080/admins';

  GetAllCustomer(tokenAdmin: string): Observable<LoginReturn[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${tokenAdmin}`
      })
    };
    return this.http.get<LoginReturn[]>(`${this.URL}/customers`,httpOptions).pipe();
  }
  GetAllEmployee(tokenAdmin: string): Observable<LoginReturn[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${tokenAdmin}`
      })
    };
    return this.http.get<LoginReturn[]>(`${this.URL}/employees`,httpOptions).pipe();
  }
  GetAllAdmin(tokenAdmin: string): Observable<LoginReturn[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${tokenAdmin}`
      })
    };
    return this.http.get<LoginReturn[]>(this.URL,httpOptions).pipe();
  }
  GetOneEmployeeWithID(tokenAdmin: string, id: string): Observable<LoginReturn> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${tokenAdmin}`
      })
    };
    return this.http.get<LoginReturn>(`${this.URL}/${id}`,httpOptions).pipe();
  }
  DeleteCustomer(tokenAdmin: string, id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${tokenAdmin}`
      })
    };
    return this.http.delete(`${this.URL}/customers/${id}`,httpOptions).pipe();
  }
  DeleteEmployee(tokenAdmin: string, id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${tokenAdmin}`
      })
    };
    return this.http.delete(`${this.URL}/${id}`,httpOptions).pipe();
  }
  searchCustomerAdmin(tokenAdmin:string ,name: string): Observable<LoginReturn[]> {
    const url = `${this.URL}/customers/search?name=${name}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${tokenAdmin}`
      })
    };
    return this.http.get<LoginReturn[]>(url, httpOptions).pipe();
  }
  searchEmployeeAdmin(tokenAdmin:string ,name: string): Observable<LoginReturn[]> {
    const url = `${this.URL}/employees/search?name=${name}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${tokenAdmin}`
      })
    };
    return this.http.get<LoginReturn[]>(url, httpOptions).pipe();
  }
  ChangeStatus(tokenAdmin:string,id:string ,status: AccountStatus): Observable<any> {
    const url = `${this.URL}/customers/${id}/lockaccount`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${tokenAdmin}`
      })
    };
    return this.http.patch(url,status, httpOptions).pipe();
  }
  ChangeRole(tokenAdmin:string,id:string ,role: UpdateRoleAdmin): Observable<any> {
    const url = `${this.URL}/employees/roleadmin/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${tokenAdmin}`
      })
    };
    return this.http.patch(url,role, httpOptions).pipe();
  }
  RegisterEmployee(User: User, tokenAdmin: string): Observable<User> {
    const url = `${this.URL}/employees/register`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${tokenAdmin}`
      })
    };
    return this.http.post<User>(url, User, httpOptions).pipe();
  }
  EditEmployee(User: UpdateEmp, tokenAdmin: string,id: string): Observable<any> {
    const url = `${this.URL}/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${tokenAdmin}`
      })
    };
    return this.http.patch(url, User, httpOptions).pipe();
  }
}

