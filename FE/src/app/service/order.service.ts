import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  Order, Order1, OrderDetail } from '../models/order';
import { AllOrder } from './../models/order';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json;charset=utf-8'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private http: HttpClient
  ) { }
  orderURL = 'http://localhost:8080/orders';
  getOrders(): Observable<AllOrder[]> {
    return this.http.get<AllOrder[]>(this.orderURL).pipe();
  }
  delete(id: string): Observable<Order> {
    return this.http.delete<Order>(`${this.orderURL}/${id}`);
  }
  addOrder(Order: Order1): Observable<Order1> {
    return this.http.post<Order1>(this.orderURL, Order);
  }
  getOrdersDetail(id): Observable<OrderDetail> {
    return this.http.get<OrderDetail>(`${this.orderURL}/${id}/orderDetails`).pipe();
  }
  orderByDay(date: string): Observable<AllOrder[]>{
    return this.http.get<AllOrder[]>(`${this.orderURL}/orderbyday/${date}`).pipe();
  }
}
