import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Inject, Injectable } from '@angular/core';
import { Publisher } from '../models/publisher';
import { Observable } from 'rxjs';
import { Books } from '../models/book';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  constructor(
    private http: HttpClient
  ) { }
  publisherURL = 'http://localhost:8080/publishers';

  getPublishers(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(this.publisherURL).pipe();
  }
  delete(id: string): Observable<Publisher> {
    return this.http.delete<Publisher>(`${this.publisherURL}/${id}`);
  }
  addPublisher(Publisher: Publisher): Observable<Publisher> {
    return this.http.post<Publisher>(this.publisherURL, Publisher);
  }
  editPublisher(Publisher: Publisher): Observable<any> {
    return this.http.put(`${this.publisherURL}/${Publisher._id}`, Publisher, httpOptions).pipe();
  }
  getPublisherFromID(id: string): Observable<Publisher> {
    const url = `${this.publisherURL}/${id}/pub`;
    return this.http.get<Publisher>(url).pipe();
  }
  getPublisherFromPublisherID(id: string): Observable<Publisher> {
    const url = `${this.publisherURL}/${id}`;
    return this.http.get<Publisher>(url).pipe();
  }
  searchBookWithPub(id: string, name: string): Observable<Books[]> {
    const url = `${this.publisherURL}/${id}/search?title=${name}`;
    return this.http.get<Books[]>(url).pipe();
  }
  searchPublisherAdmin(id: string): Observable<Publisher[]> {
    const url = `${this.publisherURL}/search?name=${id}`;
    return this.http.get<Publisher[]>(url).pipe();
  }
}
