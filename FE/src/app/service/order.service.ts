import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
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

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.orderURL).pipe();
  }
  delete(id: string): Observable<Order> {
    return this.http.delete<Order>(`${this.orderURL}/${id}`);
  }
  addOrder(Order: Order): Observable<Order> {
    return this.http.post<Order>(this.orderURL, Order);
  }

}
