import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { Cate } from '../models/cate';
import { Order, Mess, Cart } from '../models/cart';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private ApiService: ApiService,
    private http: HttpClient
  ) { }
  cartsURL = 'http://localhost:8080/carts';

  AddtoCart(id: string): Observable<Mess> {
    const url = `${this.cartsURL}/add/${id}`;
    return this.http.get<Mess>(url).pipe();
  }
  getShoppingCart(): Observable<Cart> {
    const url = `${this.cartsURL}/shoppingcart`;
    return this.http.get<Cart>(url).pipe();
  }
  getShoppingCart1(): Observable<Cart> {
    const url = `${this.cartsURL}/shoppingcart`;
    return this.http.get<Cart>(url).pipe();
  }

  ReduceItem(id: string): Observable<string> {
    const url = `${this.cartsURL}/reduce/${id}`;
    return this.http.get<string>(url).pipe();
  }
  // tslint:disable-next-line: no-shadowed-variable
  RemoveItem(id: string): Observable<string> {
    const url = `${this.cartsURL}/remove/${id}`;
    return this.http.get<string>(url).pipe();
  }
  CheckoutCart(Info: Order): Observable<any> {
    const url = `${this.cartsURL}/checkout`;
    return this.http.post(url, Info).pipe();
  }


}

