import { Component, OnInit } from '@angular/core';
import { Books } from '../models/book';
import { BooksService } from '../service/book.service';

@Component({
  selector: 'app-admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.css']
})
export class AdminBooksComponent implements OnInit {
  books: Books[];


  constructor(private BooksService: BooksService) { }

  ngOnInit() {
    this.getAllBook();
  }

  private getAllBook() {
    this.BooksService.getBooks().subscribe(res => this.books = res);
  }
}
